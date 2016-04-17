'use strict';

// include express lib, instantiate instance as app var, and initialize port number
// instantiate a router too (acts as a app instance for routes, this way we can have prefix all routes
// which are attached to the router instead of attaching them all to app and prefixing manually each time)
var express = require('express'),
	app = express(),
	port = 3000;

// add datatbase file
require('./database');
// seed file which just adds 3 entires to the db of a new app if they don't exist
//require('./seed');

// tell express to serve static files from the public dir
// expree.static is the built in "middleware" that is designed to serve static files
// the first param is the starting path (so we could do /angular, and all of the public files would be served from localhost/angular)
app.use('/',express.static('public'));

// this tells express to use body-parser's json parser (installed with npm) to parse request bodies
// (by default express does not parse request body data)
var parser = require('body-parser');
app.use(parser.json());

//ROUTING

// require/include our api router (exported from /api/index.js)
// setup all routes starting with /api to use the router instance exported from /api/index.js (prevents having
// to manually prefix all routes with /api)
var router = require('./api');
app.use('/api', router);

// start the express server instance listening on set port 
app.listen(port, function(){
	console.log("server running");
});

