
var fs =require("fs");
//var CONFIG = require("./../../config.json");
//process.env.CONFIG = JSON.stringify(CONFIG);
var CONFIG = JSON.parse(process.env.CONFIG);

function SlidModel (smodel){



//	console.log("class slid.model.js:"+smodel.type);
this.id=smodel != undefined ? smodel.id : null;
this.type=smodel != undefined ? smodel.type : null;
this.title=smodel != undefined ? smodel.title : null;
this.filename=smodel != undefined ? smodel.filename : null;

var data=smodel != undefined ? smodel.data : null;

this.setData=function (data1){
	if (data1 === "undefined") {return -1;}
	this.data=data1;
}

this.getData=function(){
	if (smodel === "undefined") {return -1;}
	return this.data;
}

SlidModel.create=function(smodel, callback){

	var metadata_path = CONFIG.contentDirectory + "/" +smodel.id +".meta.json";
	var filename_path = CONFIG.contentDirectory + "/" +smodel.filename;
	var string_content = JSON.stringify(smodel);

	fs.writeFile(metadata_path, string_content, function(err) {
		if(err) {
			return callback(err);
		}
		if(!smodel.id || err){
			return callback(err);
		}
		else {
			console.log("meta:"+string_content+" saved to " + metadata_path);
			fs.writeFile(filename_path, smodel.data, function(err) {
				if(err) {
					return callback(err);
				}
				if(!smodel.id || err){
					return callback(err);
				}else {
					console.log("Data:"+smodel.data+" saved to " + filename_path);
					callback(null, smodel);
				}
			});
		}
		
	});

	
}



SlidModel.read=function(id, callback){

	var che=CONFIG.contentDirectory + "/" +id +".meta.json";
	fs.readFile(che, function (err, data) {
		if (err) return callback(err); 
		if(!data || err) return callback(err);
		if(!id) return callback(err);
		else{
		var data_json=JSON.parse(data.toString());

		var slid_ret = new SlidModel(data_json);
		callback(null, JSON.stringify(slid_ret));
			}
	});
}
SlidModel.update=function(smodel, callback){

	var metadata_path = CONFIG.contentDirectory + "/" +smodel.id +".meta.json";
	var filename_path = CONFIG.contentDirectory + "/" +smodel.filename;

	var string_content = JSON.stringify(smodel);


	fs.writeFile(metadata_path, string_content, function(err) {
		if(err) {
			return callback(err);
		}
		if(!smodel.id || err){
			return callback(err);
		} 
		else {
			console.log("fichier mis a jour");
			if(smodel.data && smodel.data.length > 0){
				fs.writeFile(filename_path, smodel.data, function(err) {
					if(err) {
						return callback(err);
					}
					if(!smodel.id || err){
						return callback(err);
					} 
					else {
						console.log("fichier data mis a jour");
						callback(null, smodel);
					}
				});
			}
		}
		
	});

}

SlidModel.delete=function(id, callback){

SlidModel.read(id, function(err, data){
	if(err) return callback(err);
	var slid=JSON.parse(data);
	fs.unlink(CONFIG.contentDirectory + "/"+slid.filename,function(data, err){
		if(err) return callback(err);
		fs.unlink(CONFIG.contentDirectory + "/" + id +".meta.json", function(data,err){
		if(err) return callback(err);
		callback();
		});
	});
});
}
}

module.exports = SlidModel;