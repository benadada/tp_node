'use strict';

var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);


var SlidModel=require("./app/models/slid.model.js");
var utils = require("./app/utils/utils.js");
var bodyParser = require('body-parser');
var defaultRoute = require("./app/routes/default.route.js");
var slidRoute = require("./app/routes/slid.route.js");


var app = express();


//app.use(defaultRoute);
app.use(slidRoute);

app.use("/admin", express.static(path.join(__dirname, "public/admin")));



app.use("/loadPres", function(request, response) {

    var map = {};

    fs.readdir(CONFIG.presentationDirectory, function(err, files) {
        if (err) {
            console.log("erreur lors de la recuperation du repertoire");
			response.status(500).end();
        }
        console.log(files);
        // var sl = "/";



        for (var file in files) {
            var che = path.join(CONFIG.presentationDirectory, files[file]);

            utils.readFileIfExists(che, function(err, data) {
                if (err) {
            console.log("erreur lors de la recuperation des fichiers");
			response.status(500).end();
        }
                console.log("data :" + data);
                var objet = JSON.parse(data.toString());
                console.log("objet :" + objet);
                var id = objet.id;
                console.log("IIIDDDD :" + id);
                map[id] = objet;

                if (Object.keys(map).length == files.length) {
                	return response.send(map);
                }
            });
        }
    });

});	

//app.use(bodyParser.json());
app.use("/savePres", function(request, response) {

	var ob = request.body;
	console.dir(ob);
    var id =ob.id;
    var name = id.concat(".pres.json");
    console.log("name : " + name);
    var sl = "/";
    
    var chemin = CONFIG.presentationDirectory.concat(sl, name);
    console.log("chemin : " + chemin);
    fs.writeFile(chemin, JSON.stringify(ob), function(err, data) {
              if (err) {
            console.log("erreur lors de la creation des fichiers");
			response.status(500).end();
        }
        console.log("le fichier est cree");
        
        	return response.end();
        
 });

    
});


var server = http.createServer(app);
console.log(CONFIG.port)
server.listen(CONFIG.port);
