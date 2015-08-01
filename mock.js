/**
 * Created by HungNguyen on 8/1/15.
 */


var env = process.NODE_ENV || 'development';
global.CONFIG = config = require('./config/env/' + env);

global.__api = __dirname + '/api/';
global.__model = __dirname + '/model/';
global.__lib = __dirname + '/lib/';

var uri = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database_name;
var options = config.mongodb.options;


var mongoose = require('mongoose');
var User = require(__model + 'user');
var Student = require(__model + 'student');

mongoose.connect(uri, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('-------mongodb------');
    console.log('database connected!');


    var user = new User({
        username: 'hungnh',
        password: 'test',
        first_name: 'hung',
        last_name: 'nguyen',
        email: 'hung@test.com',
        location: 'hochiminh',
        age: 26,
        mobile: '0909090909',
        address: '123 llq'
    });

    //User.findOne({username: 'hungnh'}, function (err, results) {
    user.save({username: 'hungnh'}, function (err, results) {
        //console.log(results);
        var student = new Student({student_info: results._id});
        student.save(function (err, result) {
            Student.findOne().populate("student_info", '-full_name').exec(function (err, res) {
                console.log(res);
            })
        });
    });
});


