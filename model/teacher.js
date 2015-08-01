/**
 * Created by HungNguyen on 8/1/15.
 */

var mongo = require('mongoose');

var user = mongo.Schema({
    username: String,
    password: String,
    email: String,
    location: String,
    loc: {
        type: {type: String, default: "Point"},
        "coordinates": [Number]
    },
    age: Number,
    mobile: Number,
    address: String
});



module.exports = mongo.model('user', user);