var express = require("express");

var router = express.Router();
module.export =router;
router.get("/",function(req,res){
	res.send("it work!")
})