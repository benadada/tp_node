
var getListFile = require("../../myListFile.js");
var path = require("path");
var SlidModel = require("../models/slid.model.js");
var cmdList = {START: "START", PAUSE: "PAUSE", NEXT: "NEXT", PREV: "PREV", BEGIN: "BEGIN", END: "END"};
var CONFIG = JSON.parse(process.env.CONFIG);
var mapSocket ={};
var SlidController = require("./../controllers/slid.controllers.js");



exports.listen = function(server){

var io = require("socket.io")(server);
io.on("connection", function (socket) {
 socket.emit("connection");
 socket.on("data_comm", function(data){
 	     console.log("ID du socket: " + data.id);
           
            if(data.id == null || data.id == "undefined"){
                console.log("Disconnecting a socket");
                socket.emit("erreur data id (data_comm)");
               
            }
            else{
            	mapSocket[data.id]=data;

            }
});
 socket.on("slidEvent", function(cmd){
 	 console.log("slidEvent: " + JSON.stringify(cmd));
 	 if(cmd.CMD == undefined){
 	 	socket.emit("error CMD client");
 	 }
 	 else if(cmd.CMD == cmdList.START && cmd.PRES_ID == undefined){
                
                socket.emit("missing presId");
            }
    else if(cmd.CMD != cmdList.PAUSE){

    	SlidController.read(cmd.PRES_ID, function (err, slid) {
		if (err) {
			response.status(400).send("Slid not available. Cause: " + err);
		}
		else {
			
			var objet = JSON.parse(slid);
			var nw_objet_json ={};
			nw_objet_json["id"] = objet.id;
			nw_objet_json["type"] = objet.type;
			nw_objet_json["title"] = objet.title;
			nw_objet_json["filename"] = objet.filename;
			if(objet.data != null || objet.data != undefined)
			{
				nw_objet_json["data"] = objet.data;

			}
			nw_objet_json["src"] = "/slid/" + objet.id; 
			socket.broadcast.emit(nw_objet_json);
		}
	});
    }

});


});

}