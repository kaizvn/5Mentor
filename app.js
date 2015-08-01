/**
 * Created by HungNguyen on 8/1/15.
 */


var env = process.NODE_ENV || 'development';

global.__api = __dirname + '/api/';
global.__model = __dirname + '/model/';


var config = require('./config/env/' + env)
    , express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose')
    , fs = require('fs');

var HOST = process.HOST || config.server.host || 'localhost'
    , PORT = process.PORT || config.server.port || 3000;


var uri = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database_name;
var options = config.mongodb.options;

mongoose.connect(uri, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('-------mongodb------');
    console.log('database connected!');
});


var apis = fs.readdirSync(__api);

app.route('/').get(function (req, res) {
    res.send('hello world');
});

apis.forEach(function (name) {
    var path = __api + name + '/router.js';

    fs.exists(path, function (exist) {
        console.log('load %s api...', name);
        console.log('import success : %s', exist);
        exist && require(path)(app);
    });
});


var server = app.listen(PORT, HOST, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App started at http://%s:%s...', host, port);
});







