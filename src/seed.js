'use strict';

var Todo = require('./models/todo.js');

var todos = [
	'Feed the dog',
	'Walk the kids',
	'Water the carpet'
];

todos.forEach(function(todo, index){
	Todo.find({name: todo}, function(error, todos){
		if (!error && !todos.length) {
			Todo.create({
				completed: false,
				name: todo
			});
		}
	});
});