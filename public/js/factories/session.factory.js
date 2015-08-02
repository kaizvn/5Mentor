FindTeacherApp.factory('Session', function($http) {
  var Session = {
    data: {},
    saveSession: function() { /* save session data to db */ },
    updateSession: function(url) {
      /* load data from db */
      Session.data = $http.get(url).then(function(r) { return r.data;});
    }
  };
  Session.updateSession();
  return Session;
});