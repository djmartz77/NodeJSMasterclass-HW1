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
	// parse the URL and get the path
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');

	// get the HTTP method
	const httpMethod = req.method.toUpperCase();

	// get and parse the query string, if any
	const queryStringObj = parsedUrl.query;

	const headers = req.headers;

	// get the message payload, if any
	const decoder = new StringDecoder('utf-8');
	let buffer = '';

	req.on('data',function(data){
		buffer += decoder.write(data);
	});

	req.on('end',function(){
		buffer += decoder.end()
		// if HTTP method is POST, return a greeting
		const chosenHandler = typeof(router[path]) !== 'undefined' ? router[path] : handlers.notFound;

		// Construct data object to send to the handler
		const data = {
			'path' : path,
			'queryStringObject' : queryStringObj,
			'method' : httpMethod,
			'headers' : headers,
			'payload' : buffer,
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, function(statusCode,payload){
			// Use the status code called back by the handler, or default to 200
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			// Use the payload called back by the handler, or default to an empty object
			payload = typeof(payload) === 'object' ? payload : {};
			payload = payload === null ? {} : payload;

			// Convert the payload to a string
			let payloadString = JSON.stringify(payload);

			// Send the response
			res.setHeader('Content-Type','application/json');
			res.writeHead(statusCode);
			res.end(payloadString);


			// Log the request
			console.log('Returning this response:', statusCode, payloadString);
		});

	});

}



// request router
let router = {
	ping: handlers.ping,
	hello: handlers.hello,
}