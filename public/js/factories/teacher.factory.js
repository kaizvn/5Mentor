'use strict';
var base_url_api = 'http://localhost:3000/api/';
var local_api = base_url_api + 'teacher';

FindTeacherApp.factory('TeacherFactory', function ($window, $http) {
    return {
        getAll: function () {
            return $http.get(local_api)
        },
        find_by_id: function (teacher_id) {
            return $http.get(localApi + '/' + teacher_id);
        },
        find_by_subject_id: function (subject_id) {
            return $http.get(base_url_api + '/subject/' + subject_id + '/teachers');
        }

    }
});