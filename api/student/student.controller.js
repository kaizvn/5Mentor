/**
 * Created by HungNguyen on 8/1/15.
 */

var Student = require(__model + 'student');
var User = require(__model + 'user');
var responseTemplate = function () {
    this.status = 0;
    this.data = null;
    this.error = null;
};


module.exports = {
    getStudent: function (req, res) {
        var query = {};
        if (req.params.id) {
            query = {_id: req.params.id};

        } else {
            if (!req.session.user || !req.session.user._id || !req.session.user._sid) res.redirect('/');

            query = {
                _id: req.session.user._sid
            };
        }


        Student.findOne(query).populate('user_info').exec(function (err, result) {
            if (err) return res.json({status: 0, data: null, error: err});

            if (result)
                res.json({status: 1, data: result});

        });
    },
    beStudent: function (req, res) {
        if (!req.session.user || !req.session.user._id) res.redirect('/');

        var response = new responseTemplate();

        if (req.session.user._sid) {
            response.error = {
                message: 'cannot do this action.'
            };
            return res.json(response);
        }

        var userId = req.session.user._id;

        var student = new Student({user_info: userId});

        student.save(function (err, result) {
            if (err) throw err;
            response.status = 1;
            response.data = result;
            req.session.user._sid = result._id;


            User.findOne({_id: userId}, function (err, user) {
                user._sid = result._id;
                user.save();
            });

            res.json(response);

        });

    },
    put: function (req, res) {

    },
    delete: function (req, res) {

    }

};