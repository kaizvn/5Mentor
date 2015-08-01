/**
 * Created by HungNguyen on 8/1/15.
 */

var model = require(__model + 'user');
var encrypt = require(__lib + 'encrypt');

function addSession(session, data) {
    session.user = {
        id: data._id,
        username: data.username
    };
}


module.exports = {
    login: function (req, res) {
        var username = req.body.username
            , password = req.body.password;
        console.log(username, password);
        var response = {
            status: 0,
            data: {}
        };

        var query = {
            '$or': [
                {username: username},
                {email: username}
            ]
        };

        model.findOne(query, function (err, result) {
            if (err) {
                console.log(err);
                res.json(response);
            }

            if (!result) {
                response.data = {
                    message: 'username or email does not exist.'
                }
            } else {
                var isLogin = encrypt.validate(result.password, password + '');
                if (!isLogin) {
                    response.data = {
                        message: 'username and password does not match'
                    }

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
        var response = {
            status: 0,
            data: {}
        };

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
                console.log(err);
                res.json(response);
            }
            response.status = 1;
            response.data = result;
        });

    },

    register: function (req, res) {
        var response = {
            status: 0,
            data: {}
        };
        var info = req.body;
        var user = new model(info);

        user.save(function (err, result) {
            if (err) {
                if (err.code === 11000) {
                    response.data.message = 'this username is exist';
                }
                res.json(response);
            }

            addSession(req.session, result);

            delete result._id;
            delete result.password;
            response = {
                status: 1,
                data: result
            };

            res.json(response);

        });


    }
    ,
    put: function (req, res) {


    }
    ,
    delete: function (req, res) {

    }

}
;