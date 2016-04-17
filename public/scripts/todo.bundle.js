webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp', []);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(8);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular =  __webpack_require__(1);

	angular.module('todoListApp')
	.directive('todo', __webpack_require__(4));

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function todo(){
	  return {
	    templateUrl: 'templates/todo.html',
	    replace: true,
	    controller: 'todoCtrl'
	  }
	}

	module.exports = todo;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.controller('mainCtrl', __webpack_require__(6));
	angular.module('todoListApp')
	.controller('todoCtrl', __webpack_require__(7));

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function todoCtrl($scope, dataService) {
	  $scope.deleteTodo = function(todo, index) {
	    $scope.todos.splice(index, 1);
	    dataService.deleteTodo(todo);
	  };
	  
	  $scope.saveTodos = function() {
	    var filteredTodos = $scope.todos.filter(function(todo){
	      if(todo.edited) {
	        return todo
	      };
	    })
	    // send the todos that need saving to the dataService
	    // since we used a promise and return something once the dataService is done saving
	    // we can use finally here to call the resetTodoState action once everything is done
	    dataService.saveTodos(filteredTodos)
	    .finally($scope.resetTodoState());
	  }; 

	  $scope.resetTodoState = function() {
	    // set the edited property for each todo to false
	    $scope.todos.forEach(function(todo){
	      todo.edited = false;
	    })
	  }
	}

	module.exports = todoCtrl;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.service('dataService', __webpack_require__(9));

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// $http is the angular http service
	// $q is the angular request service
	function dataService($http, $q) {
	  this.getTodos = function(cb) {
	    // point to express api route
	    $http.get('/api/todos').then(cb);
	  };
	  
	  this.deleteTodo = function(todo) {
	    $http.delete('/api/todos/' + todo._id).then(function(result){
	      console.log(result);
	      if (result) {
	        console.log("I deleted the " + todo.name + " todo!");
	      } else {
	        console.log("I deleted the " + todo.name + " todo!");
	      }
	    });
	    
	  };
	  
	  this.saveTodos = function(todos) {
	    // create queue array for storing save requests
	    var queue = [];
	    // loop through todos, for each one check whether we need to send a create (POST)
	    // or update (PUT) request
	    todos.forEach(function(todo, index){
	      var request;
	      if (!todo._id) {
	        // new todo, POST
	        request = $http.post('/api/todos', todo);
	      } else {
	        // updating extsing todo, PUT
	        request = $http.put('/api/todos/' + todo._id, todo)/*.then(function(result) {
	          todo = result.data.todo;
	        });*/
	      }
	      // add the request to the queue
	      queue.push(request);
	    });
	    // use the angular q service to send multiple requests (all the ones in the queue)
	    // we're using a promise ("then") to execute some code once the q service is done sending
	    // all the requests
	    return $q.all(queue).then(function(results){
	      console.log("I saved " + todos.length + " todos.");
	    });
	  };
	  
	}

	module.exports = dataService;


/***/ }
]);