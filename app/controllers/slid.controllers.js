'use strict';

var SlidModel=require("./../models/slid.model.js");
var utils = require("./../utils/utils.js");
var CONFIG = JSON.parse(process.env.CONFIG);
var getListFile = require("./../../myListFile.js");
var path = require("path");

//module.exports = SlidController;

function list(callback){

    var dirpath = path.resolve(path.dirname(require.main.filename), CONFIG.contentDirectory);
    getListFile(dirpath, "json", function(err, files) {
        if(err){
            console.error("Error in list(): " + err);
            return callback(err);
        }
        else{
            var list_slid = {};
            console.log("test : " +files[0] );

            for (var file in files) {
                console.log("test : " +files[file] );
                var che = path.join(dirpath, files[file]);
                var jfile = require(che);
                 console.log("chemin : " + che);
                utils.readFileIfExists(che, function(err, data) {
                    if (err) {
                        console.log("erreur lors de la recuperation des fichiers");
                        //response.status(500).end();
                    }
                    var objet = JSON.parse(data.toString());
                    var id = objet.id;
                        list_slid[id] = objet;
                        if (Object.keys(list_slid).length == files.length) {
                            return callback(null, list_slid);
                        }
                        
                    });
                }
            }
    });
}

function create(param, callback){

    var slid = new SlidModel(param);
    SlidModel.create(slid, function(err, smodel){
        if(err){
            callback(err);
        }
        else{
            callback(null,smodel);
        }
    });
}

function read(id, callback){

    SlidModel.read(id, function(err, slid){
        if(err){
            return callback(err);
        }
        else{
            return callback(null, slid);
        }
    });
}
exports.read = read;
exports.list = list;
exports.create = create;
