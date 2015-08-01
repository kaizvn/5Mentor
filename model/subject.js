/**
 * Created by HungNguyen on 8/1/15.
 */


var mongo = require('mongoose');

var subject = mongo.Schema({
    name: String,
    password: String,
    email: String,
    match_skills: [String],
    teachers: [
        {
            tid: String,
            teacher_id: {type: mongo.Schema.Types.ObjectId, ref: 'Teacher'},
            location: String,
            loc: {
                type: {type: String, default: "Point"},
                "coordinates": [Number, Number]
            },
            cost: {
                money: Number,
                currency: String,
                duration: String
            }
        }
    ],
    students: [
        {
            sid: String,
            student_id: {type: mongo.Schema.Types.ObjectId, ref: 'Student'},
            location: String,
            loc: {
                type: {type: String, default: "Point"},
                "coordinates": [Number, Number]
            }
        }
    ],
    age: Number,
    mobile: Number,
    address: String,
    available: Boolean
});


module.exports = mongo.model('Subject', subject);