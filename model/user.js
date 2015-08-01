/**
 * Created by HungNguyen on 8/1/15.
 */

var mongo = require('mongoose')
    , encrypto = require(__lib + 'encrypt');


var user = mongo.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    full_name: String,
    first_name: String,
    last_name: String,
    email: {type: String, require: true, unique: true},
    location: String,
    age: Number,
    mobile: String,
    address: String,
    avatar_url: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// EnScript Password before save to database
user.pre('save', function (next) {
    var user = this;
    // Check user's password is modified
    if (!user.isModified('password')) return next();
    console.log(user.first_name, user.last_name);
    user.full_name = user.first_name + ' ' + user.last_name;
    // Encode password
    user.password = encrypto.hash(user.password);
    next();
});


module.exports = mongo.model('User', user);
