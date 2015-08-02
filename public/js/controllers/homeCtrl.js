FindTeacherApp.controller('HomeController', ['$scope', 'SubjectFactory', function($scope, SubjectFactory) {
  SubjectFactory.getAll()
    .success(function(subjects){
      $scope.subjects = subjects.data
    })
    .error(function(err){
      console.log(err)
    })
}]);