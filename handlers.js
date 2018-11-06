/*
* NodeJS Masterclass Homework Assignment #1
* Handlers file
*
*/

let handlers = {};

handlers.ping = function(data,callback){
	callback(200);
};

handlers.notFound = function(data,callback){
	callback(404);
};


module.exports = handlers;