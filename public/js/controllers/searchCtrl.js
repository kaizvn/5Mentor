var module = function ($scope, $window, $stateParams, TeacherFactory) {
    console.log($stateParams);
    var subject_id = $stateParams.service;
    $scope.results = {};
    $scope.result = {
        "status": 1,
        "data": [
            {
                "_id": "55bd8d4917ca06796ade8c80",
                "name": "Algebra",
                "available": true,
                "students": [],
                "teachers": [
                    {
                        "_id": "55bdb33722433bc6190ed81f",
                        "subject_info": "55bd8d4917ca06796ade8c80",
                        "person_info": "55bda883603f6af10ff2d9cb",
                        "description": "I am the master of the world",
                        "__v": 0,
                        "cost": {
                            "money": 100,
                            "currency": "$",
                            "duration": "hour"
                        },
                        "loc": {
                            "coordinates": [
                                106.71444199999999,
                                10.802524799999999
                            ],
                            "type": "Point"
                        }
                    },
                    {
                        "_id": "55bdbdca54c9ea9927f82751",
                        "subject_info": "55bd8d4917ca06796ade8c80",
                        "person_info": "55bda883603f6af10ff2d9cb",
                        "description": "I am the master of the world 2",
                        "__v": 0,
                        "cost": {
                            "money": 100,
                            "currency": "$",
                            "duration": "hour"
                        },
                        "loc": {
                            "coordinates": [
                                106.71444199999999,
                                10.802524799999999
                            ],
                            "type": "Point"
                        }
                    }
                ],
                "match_skills": [],
                "image_url": "https://tl-cdn.s3.amazonaws.com/images/public/landing/popularServices/tutoring/algebra.jpg",
                "__v": 0
            }
        ],
        "error": null
    };

    TeacherFactory.find_by_subject_id(subject_id)
        .success(function (subjects) {
            $scope.results = subjects.data
        })
        .error(function (err) {
            console.log(err)
        })
};


module.$inject = ['$scope', '$window', '$stateParams', 'TeacherFactory'];


FindTeacherApp.controller('SearchCtrl', module);
