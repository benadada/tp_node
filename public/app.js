var express = require("express");
var app =express();

var http = require("http");

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var defaultRoute = 	require("./app/routes/default.route.js")

app.use(defaultRoute);

var server = http.createServer(app);
console.log(CONFIG.port)
server.listen(CONFIG.port);

