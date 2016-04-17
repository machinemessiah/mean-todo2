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