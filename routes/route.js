const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();
const IndexController = require("../controllers/indexController");

router.get("/index/getCarParks", multer().any(), IndexController.getCarParks);

module.exports = router;