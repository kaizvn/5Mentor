/**
 * Created by HungNguyen on 8/1/15.
 */


var subjectModel = require(__model + 'subject');
var User = require(__model + 'user');
var subjectSource = {
    student: require(__model + 'subjectSeeker'),
    teacher: require(__model + 'subjectMaster')
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
        var query = (req.params.id) ? {id: req.params.id} : {};
        query.available = true;

        var options = {
            _id: 0
        };

        subjectModel.find(query, options, function (err, subjects) {
            if (err) {
                response.error = err;
                return res.json(response);
            }
            response.status = 1;
            console.log('subs:', subjects);

            if (subjects) response.data = [];
            else response.data = (req.params.id) ? subjects[0] : subjects;
            res.json(response);
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

                console.log('subs:', peopleInNeeds);

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
        var response = new responseTemplate();
        var params = req.body;
        if (!!params.longitude || !!params.latitude || !!params.subject_id || !params.description) {
            response.error = {
                message: 'invalid input info.'
            };
            return res.json(response);
        }

        var subjectId = mongo.Schema.Types.ObjectId(params.subject_id);
        var teacherId = req.session.user._tid;

        var info = {
            subject_info: subjectId,
            person_info: teacherId,
            location: params.location,
            description: params.description,
            loc: {
                "coordinates": [params.longitude, params.latitude]
            },
            cost: {
                money: params.money,
                currency: params.currency || '$',
                duration: prams.duration || 'hour'
            }
        };

        var master = new subjectSource['teacher'](info);

        master.save(function (err, result) {
            if (err) {
                response.error = err;
                return res.json(response);
            }

            delete result._id;
            response.status = 1;
            response.data = result;

            res.json(response);

        })
    },

    beSubjectSeeker: function (req, res) {
        var response = new responseTemplate();
        var params = req.body;
        if (!!params.longitude || !!params.latitude || !!params.subject_id || !params.description) {
            response.error = {
                message: 'invalid input info.'
            };
            return res.json(response);
        }

        var subjectId = mongo.Schema.Types.ObjectId(params.subject_id);
        var studentId = req.session.user._sid;

        var info = {
            subject_info: subjectId,
            person_info: studentId,
            location: params.location,
            description: params.description,
            loc: {
                "coordinates": [params.longitude, params.latitude]
            }
        };

        var master = new subjectSource['student'](info);

        master.save(function (err, result) {
            if (err) {
                response.error = err;
                return res.json(response);
            }

            delete result._id;
            response.status = 1;
            response.data = result;

            res.json(response);

        })


    },

    addSubject: function (req, res) {
        var response = new responseTemplate();
        var info = req.body;
        var subject = new subjectModel(info);
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