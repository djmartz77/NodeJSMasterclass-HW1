/*
* NodeJS Masterclass Homework Assignment #1
* Main API file
*
*/

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const handlers = require('./handlers');

// Instantiate http server
const httpServer = http.createServer(function(req, res){
	unifiedServer(req, res);
});

// Start http server
httpServer.listen(config.httpPort, function(){
	console.log(config.envName,'HTTP server listening on port',config.httpPort);
});


// Instantiate https server
const httpsServerOptions = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem'),
}

const httpsServer = https.createServer(httpsServerOptions, function(req, res){
	unifiedServer(req, res);
});

// Start https server
httpsServer.listen(config.httpsPort, function(){
	console.log(config.envName,'HTTPS server listening on port',config.httpsPort);
});


// Unified server logic
const unifiedServer = function(req,res) {
	console.log('reached unifiedServer');
	res.end('Hello dude.');
}



// request router
let router = {
	ping: handlers.ping,
	hello: handlers.hello,
}