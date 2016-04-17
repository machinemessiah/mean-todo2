'use strict';

var express = require('express'),
	router = express.Router(),
	// include our Todo data model so we can use it
	Todo = require('../models/todo');

// include mock todo data from mock folder (relative path from this file)
//var todos = require('../../mock/todos.json');

// app.get/router.get defines a GET route, first param is URL, second is callback when that url is visited
router.get('/todos', function(request, response){
	// get todos from db
	Todo.find({}, function(error, todos){
		if (error) {
			return response.status(500).json({message: error.message});
		} else {
			response.json({todos: todos});
		}
		
	});
});

// POST route for creating new todos
router.post('/todos', function(request, response){
	var todo = request.body;
	Todo.create(todo, function(error, todo){
		if (error) {
			return response.status(500).json({error: error.message});
		}
		response.json({
			todo: todo,
			message: "Todo created"
		});
	});
});

// PUT route for updating todos
router.put('/todos/:id', function(request, response){
	// grab id from request params
	var id = request.params.id,
		todo = request.body;

	// check that todo exists
	if (todo && todo._id !== id) {
		return response.status(500).json({error: "No todo found!"});
	}

	// update todo
	// third argument is options, we specify new:true so mongo returns the updated document
	// rather than the one found in the db by the find request
	Todo.findByIdAndUpdate(id, todo, {new: true}, function(error, todo){
		if (error) {
			return response.status(500).json({error: error.message});
		}
		response.json({
			todo: todo,
			message: "Todo updated"
		});
	});
});

// DELETE route to delete todos
router.delete('/todos/:id', function(request, response){
	var id = request.params.id;
	Todo.findByIdAndRemove(id, function(error, todo){
		if (error) {
			return response.status(500).json({error: error.message});
		}
		response.json({
			message: "Todo deleted"
		});
	});
});

module.exports = router;