/*
* Determine and export environment variables. 
* QA environment is set by default
*
*/

let environments = {};

environments.development = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: 'development',
};

environments.QA = {
	httpPort: 4000,
	httpsPort: 4001,
	envName: 'QA',
};

environments.production = {
	httpPort: 5000,
	httpsPort: 5001,
	envName: 'production',
};

if(environments[process.env.NODE_ENV]){
	module.exports = environments[process.env.NODE_ENV];
	console.log('environment:',process.env.NODE_ENV,'set', environments[process.env.NODE_ENV]);
} else {
	module.exports = environments.QA;
	console.log('environment:',process.env.NODE_ENV,'not found. defaulting to QA', environments.QA);
}
