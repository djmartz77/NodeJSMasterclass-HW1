/*
* NodeJS Masterclass Homework Assignment #1
* Handlers file
*
*/

let handlers = {};

handlers.hello = function(data,callback){
	if(data.method === 'POST'){
		if(data.queryStringObject.name){
			callback(200, {greeting: 'Hello, ' +data.queryStringObject.name})
		} else {
			callback(200, {greeting: 'Hello, friend!'});
		}
		
	} else {
		callback(200, {result: 'Not a POST'});
	}
};

handlers.ping = function(data,callback){
	callback(200);
};

handlers.notFound = function(data,callback){
	callback(404);
};


module.exports = handlers;