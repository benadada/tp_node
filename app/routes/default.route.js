/*var express = require("express");

var router = express.Router();
module.exports =router;
router.get("/",function(req,res){
	res.send("it work!")
})
*/
'use strict';


var express = require("express");
var router = express.Router();

var CONFIG = require("./../../config.json");

var SlidController = require("./../controllers/slid.controllers.js");
var multer = require("multer");
var utils = require("../utils/utils.js");

var bodyParser = require("body-parser");

//cree slide avec information dans la requete
router.post("/slids", function(request, response){ 
	console.log("work");
	response.send("work")
	})
module.exports = router;



//retourne slide avec id
//router.route('/slids/:slidId')
//.post(SlidController.);
