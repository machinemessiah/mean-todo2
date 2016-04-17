'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-todo', function(error){
	if (error) {
		console.log("failed to connect to MONGOdb", error);
	} else {
		console.log("connected to MONGOdb");
	}
});