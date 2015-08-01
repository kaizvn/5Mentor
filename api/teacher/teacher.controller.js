/**
 * Created by HungNguyen on 8/1/15.
 */
var Teacher = require(__model + 'student');
var User = require(__model + 'user');
var responseTemplate = function () {
    this.status = 0;
    this.data = null;
    this.error = null;
};


module.exports = {
    getTeacher: function (req, res) {
        var query = {};
        if (req.params.id) {
            query = {_id: req.params.id};

        } else {
            if (!req.session.user || !req.session.user._id || !req.session.user._tid) res.redirect('/');

            query = {
                _id: req.session.user._tid
            };
        }

        Teacher.findOne(query).populate('user_info').exec(function (err, result) {
            if (err) return res.json({status: 0, data: null, error: err});

            if (result)
                res.json({status: 1, data: result});

        });
    },
    beTeacher: function (req, res) {
        if (!req.session.user || !req.session.user._id) res.redirect('/');

        var response = new responseTemplate();
        var info = req.body;
        if (req.session.user._tid) {
            response.error = {
                message: 'cannot do this action.'
            }
            return res.json(response);
        }

        if (info.rate) delete info.rate;
        info.user_info = req.session.user._id;
        var teacher = new Teacher(info);

        teacher.save(function (err, result) {
            if (err) throw err;
            response.status = 1;
            response.data = result;
            req.session.user._tid = result._id;

            User.findOne({_id: info.user_info}, function (err, user) {
                user._tid = result._id;
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