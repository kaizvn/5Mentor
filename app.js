/**
 * Created by HungNguyen on 8/1/15.
 */


var env = process.NODE_ENV || 'development';

var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , path = require('path')
    , mongoose = require('mongoose')
    , fs = require('fs')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session);


global.CONFIG = config = require('./config/env/' + env);

global.__api = __dirname + '/api/';
global.__model = __dirname + '/model/';
global.__lib = __dirname + '/lib/';

var userModel = require(__api + 'user/user.controller');

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


/* 404 */
/*app.route('/:url(api|auth|components|app|bower_components|assets)/!*')
 .get(function (req, res) {
 res.sendStatus(404);
 });*/


/* frontend path */

var sessionOptions = {
    mongooseConnection: db,
    touchAfter: 24 * 3600, // time period in seconds
    ttl: 14 * 24 * 60 * 60,// = 14 days. Default
    moreOptions: {stringify: true}
};


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(session({
    secret: 'no pain no gain',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore(sessionOptions)
}));


app.use(express.static(path.join(__dirname, '/public')));

app.post('/login', userModel.login);
app.get('/logout', userModel.logout);
app.post('/register', userModel.register);

var root = '/api';
apis.forEach(function (name) {
    var path = __api + name + '/' + name + '.router.js';

    fs.exists(path, function (exist) {
        console.log('load %s api...', name);
        console.log('import success : %s', exist);
        exist && require(path)(app, root);
    });
});


var server = app.listen(PORT, HOST, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App started at http://%s:%s...', host, port);
});







