'use strict';
var base_url_api = 'http://localhost:3000/api/';
FindTeacherApp.factory('SubjectFactory', function ($window, $http) {
    return {
        getAll: function () {
            return $http.get(base_url_api + 'subject')
        },
        find_by_id: function (subject_id) {
            return $http.get(base_url_api + 'subject/' + subject_id);
        }
    }
});