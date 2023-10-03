const express = require("express");
const app = express();
const routes = require('./routes/route.js');
const cors = require('cors');
//middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(3000, ()=>{
    console.log("Listening to server 3000")
});