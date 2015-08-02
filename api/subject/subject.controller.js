/**
 * Created by HungNguyen on 8/1/15.
 */


var Subject = require(__model + 'subject');
var User = require(__model + 'user');
var Teacher = require(__model + 'teacher');

var subjectSource = {
    students: require(__model + 'subjectSeeker'),
    teachers: require(__model + 'subjectMaster')
};

var mongo = require('mongoose');

var encrypt = require(__lib + 'encrypt');
var _ = require('lodash');

var responseTemplate = function () {
    this.status = 0;
    this.data = null;
    this.error = null;
};


module.exports = {
    getSubject: function (req, res) {
        var response = new responseTemplate();
        var query = (req.params.id) ? {_id: req.params.id} : {};
        query.available = true;

        var options = {};

        var populateList = req.params.list || '';

        Subject.find(query, options).populate(populateList).exec(function (err, subjectMasters) {
            if (err) {
                response.error = err;
                return res.json(response);
            }
            response.status = 1;


            if (!subjectMasters || subjectMasters.length === 0) {
                response.data = [];
                res.json(response);

            } else if (!populateList) {
                response.data = (req.params.id) ? subjectMasters[0] : subjectMasters;
                res.json(response);
            }
            else {
                console.log('master', subjectMasters[0][populateList]);
                var str = populateList + '.user_info';
                console.log(str);
                User.populate(subjectMasters, str,
                    //User.populate(subjectMasters, str,
                    function (err, finalList) {
                        /*console.log('semi', semiFinalList[0]);
                         User.populate(semiFinalList, str, function (err, finalList) {*/
                        response.data = finalList;
                        res.json(response);
                        //});

                    });
            }

        });

    },
    getSubjectByLocation: function (req, res) {
        var response = new responseTemplate();
        var params = req.params;
        if (!!params.longitude || !!params.latitude || !!params.id) {
            response.error = {
                message: 'invalid input info.'
            };
            return res.json(response);
        }

        var query = {
            id: req.params.id, loc: {
                '$near': {
                    '$maxDistance': 1000,
                    '$geometry': {type: 'Point', coordinates: [params.longitude, params.latitude]}
                }
            }
        };
        // params type = 1 : search teacher;
        var source = (params.type == 1) ? 'teacher' : 'student';

        subjectSource[source].find(query)
            .populate('person_info')
            .exec(function (err, peopleInNeeds) {
                if (err) {
                    response.error = err;
                    return res.json(response);
                }

                response.status = 1;


                if (!peopleInNeeds || !peopleInNeeds.length) response.data = [];

                else {
                    User.populate(peopleInNeeds, 'person_info.user_info', function (err, allResults) {
                        response.data = allResults;
                        res.json(response);
                    });

                }

            });

        /*db.items.find({loc: { $near : {$geometry :{ type :'Point', coordinates : [106.701904, 10.77663]  }, $maxDistance : 20}  } }).explain("executionStats")*/
        /*db.items.find({loc: { $nearSphere : {$geometry :{ type :'Point', coordinates : [106.701904, 10.77663]  }, $maxDistance : 20}  } }).explain("executionStats")*/
        /*db.items.createIndex({"loc":"2dsphere"})*/

    },


    beSubjectMaster: function (req, res) {
        console.log(req.session.user);
        var response = new responseTemplate();
        var body = req.body;
        if (!body.longitude || !body.latitude || !body.subject_id || !body.description) {
            response.error = {
                message: 'invalid input info.'
            };
            return res.json(response);
        }

        var subjectId = body.subject_id;
        var teacherId = req.session.user._tid;
        var userId = req.session.user._id;

        var info = {
            subject_info: subjectId,
            person_info: teacherId,
            user_info: userId,
            location: body.location,
            description: body.description,
            loc: {
                "coordinates": [body.longitude, body.latitude]
            },
            cost: {
                money: body.money,
                currency: body.currency || '$',
                duration: body.duration || 'hour'
            }
        };

        var master = new subjectSource['teachers'](info);

        master.save(function (err, result) {
            if (err) {
                response.error = err;
                return res.json(response);
            }
            Subject.update({_id: subjectId}, {
                "$push": {"teachers": result._id}
            }, function (e, b) {
                console.log('added to list ', b);
            });

            delete result._id;
            response.status = 1;
            response.data = result;

            res.json(response);

        })
    },

    beSubjectSeeker: function (req, res) {
        var response = new responseTemplate();
        var body = req.body;
        if (!!body.longitude || !!body.latitude || !!body.subject_id || !body.description) {
            response.error = {
                message: 'invalid input info.'
            };
            return res.json(response);
        }

        var subjectId = body.subject_id;
        var studentId = req.session.user._sid;

        var info = {
            subject_info: subjectId,
            person_info: studentId,
            location: body.location,
            description: body.description,
            loc: {
                "coordinates": [body.longitude, body.latitude]
            }
        };

        var master = new subjectSource['student'](info);

        master.save(function (err, result) {
            if (err) {
                response.error = err;
                return res.json(response);
            }


            Subject.findAndModify({
                _id: subjectId
            }, {
                "$push": {"students": result._id}
            });


            delete result._id;
            response.status = 1;
            response.data = result;

            res.json(response);

        })


    },

    addSubject: function (req, res) {
        var response = new responseTemplate();
        var info = req.body;
        var subject = new Subject(info);
        subject.save(function (err, subject) {
            if (err) {
                response.error = err;
                return res.json(response);
            }

            delete subject._id;
            response.status = 1;
            response.data = subject;

            res.json(response);

        });

    },
    editSubject: function (req, res) {

    },
    delete: function (req, res) {

    }

};