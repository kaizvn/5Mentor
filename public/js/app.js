var FindTeacherApp = angular.module('FindTeacherApp', ['ui.router']);

FindTeacherApp.config(function ($stateProvider, $urlRouterProvider) {

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
            url: '/search.html?service&type',
            templateUrl: '../views/search.html',
            controller: 'SearchCtrl as vm'
        })
        .state('signup', {
            url: '/auth/signup.html',
            templateUrl: '../views/signup.html'
        })
        .state('signin', {
            url: '/auth/signin.html',
            templateUrl: '../views/signin.html'
        })

});

// Init Header
FindTeacherApp.controller('HeaderController', function ($scope) {
    $scope.address = ""
    $scope.getCurrentLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                $scope.address = "Your current location"
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
});

// Init Footer

FindTeacherApp.controller('FooterController', function ($scope) {

});

FindTeacherApp.controller('HowItWorkController', function ($scope) {

});

FindTeacherApp.controller('LocallyOnlineController', function ($scope) {

});

FindTeacherApp.controller('StudentReviewController', function ($scope) {

});