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
