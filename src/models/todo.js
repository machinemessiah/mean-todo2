'use strict';

var mongoose = require('mongoose');

// schema for todo document

var todoSchema = new mongoose.Schema({
	name: String,
	completed: Boolean,
	completedOn: Date
});

var model = mongoose.model('Todo', todoSchema);

module.exports = model;