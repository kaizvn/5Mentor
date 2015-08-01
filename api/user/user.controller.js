/**
 * Created by HungNguyen on 8/1/15.
 */

var model = require(__model + 'user');
var encrypt = require(__lib + 'encrypt');
var _ = require('lodash');

function addSession(session, data) {
    session.user = {
        id: data._id,
        username: data.username
    };
}

var responseTemplate = function () {
    this.status = 0;
    this.data = null;
    this.error = null;
};


module.exports = {
    login: function (req, res) {
        var username = req.body.username
            , password = req.body.password;

        var response = new responseTemplate();

        var query = {
            '$or': [
                {username: username},
                {email: username}
            ]
        };

        model.findOne(query, function (err, result) {
            if (err) {
                response.error = err;
                return res.json(response);
            }

            if (!result) {
                response.error = {message: 'username or email does not exist.'};

            } else {
                var isLogin = encrypt.validate(result.password, password + '');

                if (!isLogin) {
                    response.error = {message: 'username and password does not match'};

                } else {
                    addSession(req.session, result);
                    delete result._id;
                    delete result.password;

                    response.status = 1;
                    response.data = result;
                }
            }

            res.json(response)
        });
    },

    logout: function (req, res) {
        req.session.destroy(function (err) {
            if (err) throw err;
            res.redirect('/');
        })
    },

    getUser: function (req, res) {
        var response = new responseTemplate();

        var username = req.username;
        var query = {
            '$or': [
                {username: username},
                {email: username}
            ]
        };
        var options = {
            _id: 0
        };

        model.findOne(query, options, function (err, result) {
            if (err) {
                response.error = err;
                return res.json(response);
            }
            response.status = 1;
            response.data = result;
        });

    },

    register: function (req, res) {
        var response = new responseTemplate();

        var info = req.body;
        var user = new model(info);
        user.save(function (err, result) {
            if (err) {
                response.error = (err.code === 11000) ? {message: 'this username or email is exist'} : err;
                res.json(response);
                return;
            }

            addSession(req.session, result);

            delete result._id;
            delete result.password;
            response.status = 1;
            response.data = result;

            res.json(response);

        });


    }
    ,
    update: function (req, res) {
        var response = new responseTemplate();
        var info = req.body;
        if (!req.session.user || info.username) {
            response.error = {message: 'Data error'};
            return res.json(response);

        }

        var query = {_id: req.session.user.id};


        model.findOne(query, function (err, user) {
            if (err) {
                response.error = err;
                return res.json(response);
            }

            if (!user) {
                response.error = {
                    message: 'error. This user is not exist!'
                }
            }

            _.extend(user, info);
            user.full_name = user.first_name + ' ' + user.last_name;

            user.save(function (err, result) {
                if (err) {
                    response.error = err;
                    return res.json(response);
                }
                response.status = 1;
                response.data = result;
                res.json(response);
            });
        });

    }
    ,
    delete: function (req, res) {

    }

}
;