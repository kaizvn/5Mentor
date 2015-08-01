/**
 * Created by HungNguyen on 8/1/15.
 */


var model = require(__model + 'subject');
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

        var options = {
            _id: 0
        };

        model.find(query, options, function (err, subjects) {
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
    addSubject: function (req, res) {
        var response = new responseTemplate();
        var info = req.body;
        var subject = new model(info);
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