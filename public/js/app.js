var FindTeacherApp = angular.module('FindTeacherApp', ['ui.router']);

FindTeacherApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: '../views/index.html'
  })
  .state('howitworks', {
    url: '/howitworks.html',
    templateUrl: '../views/howitworks.html'
  })
  .state('students', {
    url: '/students.html',
    templateUrl: '../views/students.html'
  })
  .state('teachers', {
    url: '/teachers.html',
    templateUrl: '../views/teachers.html'
  })
  .state('search', {
    url: '/search.html',
    templateUrl: '../views/search.html'
  })


});

// Init Header
FindTeacherApp.controller('HeaderController', function($scope) {

});

// Init Footer

FindTeacherApp.controller('FooterController', function($scope) {

});