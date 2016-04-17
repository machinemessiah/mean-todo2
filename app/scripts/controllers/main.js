'use strict';

// $log and $interval are angular wrappers for javascript functions
// (console.log and window.setInterval respectively)
function mainCtrl($scope, $log, $interval, dataService){
  
	/*$scope.seconds = 0;
	$scope.counter = function() {
		$scope.seconds++;
		$log.log($scope.seconds + ' have passed');
	};

	// 1 second delay, repeat ten times
	$interval($scope.counter, 1000, 10);*/

	dataService.getTodos(function(response){
		var todos = response.data.todos;  
		$scope.todos =  todos;
	});
  
	$scope.addTodo = function() {
		$scope.todos.unshift({name: "This is a new todo.",
	                  completed: false, edited: true});
	};

}

module.exports = mainCtrl;