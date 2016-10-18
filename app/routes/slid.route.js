'use strict';


var express = require("express");
var router = express.Router();

var CONFIG = require("./../../config.json");

var SlidController = require("./../controllers/slid.controllers.js");
var multer = require("multer");
var utils = require("../utils/utils.js");
var path = require("path");

var bodyParser = require("body-parser");


var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
		  cb(null, 'uploads/');
	  },
	  filename: function (req, file, cb) {
		  console.log("file: " + JSON.stringify(file));
		  cb(null, utils.generateUUID()+ path.extname(file.originalname));
	  }
});

var upload = multer({ storage: storage });
//retourne liste des slids
//.get(SlidController.);

//cree slide avec information dans la requete
router.post("/slids", upload.single("file"), function(request, response){ 
	var ofname = request.file.originalname;
	var fname = request.file.filename;
	var titre = ofname.substr(0, ofname.lastIndexOf('.'));
	var id = fname.substr(0, fname.lastIndexOf('.'));
	var type = path.extname(request.file.originalname).substr(1);

	var json_file ={};
	json_file["id"]= id;
	json_file["type"]= type;
	json_file["title"]=titre;
	json_file["filename"]= request.file.filename;
	json_file["data"]=request.file;
	SlidController.create(json_file, function(err, data){
		if(err){
			response.status(400).send("List of contents not available. Cause: " + err);
			console.log("data erreur:"+err);
		}
		else{
			//console.log("List slid: " + listSlid); //  The full path to the uploaded file
			response.json(data)
			console.log("data:"+JSON.stringify(data));
		}
	});

	})


router.get("/slids", upload.single("file"), function(request, response){

	SlidController.list(function(err, listSlid){
		if(err){
			response.status(400).send("List of contents not available. Cause: " + err);
			console.log("data erreur:"+err);
		}
		else{
			//console.log("List slid: " + listSlid); //  The full path to the uploaded file
			response.json(listSlid)
			console.log("data:"+JSON.stringify(listSlid));
		}
		});

	})



router.get("/slids/:id", function(request, response) {

	var id = request.url.split("/slids/");
	SlidController.read(id[1], function (err, slid) {
		if (err) {
			response.status(400).send("Slid not available. Cause: " + err);
		}
		else {
			response.json(JSON.parse(slid));
		}
	});
});
module.exports = router;



//retourne slide avec id
//router.route('/slids/:slidId')
//.post(SlidController.);
