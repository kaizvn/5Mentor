/**
 * Created by HungNguyen on 8/1/15.
 */

var mongo = require('mongoose')
    , encrypto = require(__lib + 'encrypt');


var user = mongo.Schema({
    username: String,
    password: String,
    full_name: String,
    first_name: String,
    last_name: String,
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

// EnScript Password before save to database
user.pre('save', function (next) {
    var user = this;
    // Check user's password is modified
    if (!user.isModified('password') || user.old_system == true) return next();

    user.full_name = user.first_name + ' ' + user.last_name;
    // Encode password
    user.password = encrypto.hash(user.password);
    next();


});


module.exports = mongo.model('user', user);