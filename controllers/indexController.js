const axios = require('axios');

class IndexController{
    static getCarParks = async (req, res) => {
        try{
            if(req.method != 'GET'){
                throw new Error('Invalid HTTP request.');
            }

            const response = await axios.get('https://api.data.gov.sg/v1/transport/carpark-availability');
            if(response.status != 200){
                throw new Error('Invalid response!');
            }

            const timestamp = response.data.items[0].timestamp;
            const carparks = response.data.items[0].carpark_data;
            var small = {
                highest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                },
                lowest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                }
            }
            var medium = {
                highest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                },
                lowest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                }
            }
            var big = {
                highest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                },
                lowest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                }
            }
            var large = {
                highest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                },
                lowest: {
                    carparkNumber: [],
                    lotsAvailable: 0
                }
            }
            if(carparks.length > 0){
                for(var i=0;i<carparks.length;i++){
                    const carparkInfo = carparks[i].carpark_info;
                    const carparkNumber = carparks[i].carpark_number;
                    var totalLot = 0;
                    var lotsAvailable = 0;
                    if(carparkInfo.length > 0){
                        for(var j=0;j<carparkInfo.length;j++){
                            totalLot += parseInt(carparkInfo[j].total_lots)
                            lotsAvailable += parseInt(carparkInfo[j].lots_available);
                        }
                    }

                    if(totalLot < 100){
                        if(small.highest.carparkNumber.length === 0){
                            small.highest.carparkNumber.push(carparkNumber);
                            small.highest.lotsAvailable = lotsAvailable
                        }else{
                            if(lotsAvailable === small.highest.lotsAvailable){
                                small.highest.carparkNumber.push(carparkNumber);
                            }else if(lotsAvailable > small.highest.lotsAvailable){
                                small.highest.carparkNumber = [carparkNumber];
                                small.highest.lotsAvailable = lotsAvailable
                            }else if(lotsAvailable < small.highest.lotsAvailable){
                                if(small.lowest.carparkNumber.length === 0){
                                    small.lowest.carparkNumber.push(carparkNumber);
                                    small.lowest.lotsAvailable = lotsAvailable
                                }else{
                                    if(lotsAvailable === small.lowest.lotsAvailable){
                                        small.lowest.carparkNumber.push(carparkNumber);
                                    }else if(lotsAvailable < small.lowest.lotsAvailable){
                                        small.lowest.carparkNumber = [carparkNumber];
                                        small.lowest.lotsAvailable = lotsAvailable;
                                    }
                                }
                            }
                        }
                    }else if(totalLot >= 100 && totalLot < 300){
                        if(medium.highest.carparkNumber.length === 0){
                            medium.highest.carparkNumber.push(carparkNumber);
                            medium.highest.lotsAvailable = lotsAvailable
                        }else{
                            if(lotsAvailable === medium.highest.lotsAvailable){
                                medium.highest.carparkNumber.push(carparkNumber);
                            }else if(lotsAvailable > medium.highest.lotsAvailable){
                                medium.highest.carparkNumber = [carparkNumber];
                                medium.highest.lotsAvailable = lotsAvailable
                            }else if(lotsAvailable < medium.highest.lotsAvailable){
                                if(medium.lowest.carparkNumber.length === 0){
                                    medium.lowest.carparkNumber.push(carparkNumber);
                                    medium.lowest.lotsAvailable = lotsAvailable
                                }else{
                                    if(lotsAvailable === medium.lowest.lotsAvailable){
                                        medium.lowest.carparkNumber.push(carparkNumber);
                                    }else if(lotsAvailable < medium.lowest.lotsAvailable){
                                        medium.lowest.carparkNumber = [carparkNumber];
                                        medium.lowest.lotsAvailable = lotsAvailable;
                                    }
                                }
                            }
                        }
                    }else if(totalLot >= 300 && totalLot < 400){
                        if(big.highest.carparkNumber.length === 0){
                            big.highest.carparkNumber.push(carparkNumber);
                            big.highest.lotsAvailable = lotsAvailable
                        }else{
                            if(lotsAvailable === big.highest.lotsAvailable){
                                big.highest.carparkNumber.push(carparkNumber);
                            }else if(lotsAvailable > big.highest.lotsAvailable){
                                big.highest.carparkNumber = [carparkNumber];
                                big.highest.lotsAvailable = lotsAvailable
                            }else if(lotsAvailable < big.highest.lotsAvailable){
                                if(big.lowest.carparkNumber.length === 0){
                                    big.lowest.carparkNumber.push(carparkNumber);
                                    big.lowest.lotsAvailable = lotsAvailable
                                }else{
                                    if(lotsAvailable === big.lowest.lotsAvailable){
                                        big.lowest.carparkNumber.push(carparkNumber);
                                    }else if(lotsAvailable < big.lowest.lotsAvailable){
                                        big.lowest.carparkNumber = [carparkNumber];
                                        big.lowest.lotsAvailable = lotsAvailable;
                                    }
                                }
                            }
                        }
                    }else if(totalLot >= 400){
                        if(large.highest.carparkNumber.length === 0){
                            large.highest.carparkNumber.push(carparkNumber);
                            large.highest.lotsAvailable = lotsAvailable
                        }else{
                            if(lotsAvailable === large.highest.lotsAvailable){
                                large.highest.carparkNumber.push(carparkNumber);
                            }else if(lotsAvailable > large.highest.lotsAvailable){
                                large.highest.carparkNumber = [carparkNumber];
                                large.highest.lotsAvailable = lotsAvailable
                            }else if(lotsAvailable < large.highest.lotsAvailable){
                                if(large.lowest.carparkNumber.length === 0){
                                    large.lowest.carparkNumber.push(carparkNumber);
                                    large.lowest.lotsAvailable = lotsAvailable
                                }else{
                                    if(lotsAvailable === large.lowest.lotsAvailable){
                                        large.lowest.carparkNumber.push(carparkNumber);
                                    }else if(lotsAvailable < large.lowest.lotsAvailable){
                                        large.lowest.carparkNumber = [carparkNumber];
                                        large.lowest.lotsAvailable = lotsAvailable;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return res.status(200).json({
                small: small,
                medium: medium,
                big: big,
                large: large,
                time: timestamp
            })
        }catch(err) {
            console.log(err)
            return res.status(400).json({message: err.message});
        }
    }
}

module.exports = IndexController;