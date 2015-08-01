/**
 * Created by HungNguyen on 8/2/15.
 */

var mongo = require('mongoose');


var subjectMaster = mongo.Schema({
    subject_info: {
        type: mongo.Schema.Types.ObjectId, ref: 'Subject'
    },
    person_info: {type: mongo.Schema.Types.ObjectId, ref: 'Teacher'},
    location: String,
    description: String,
    loc: {
        type: {type: String, default: "Point"},
        "coordinates": [Number]
    },
    cost: {
        money: Number,
        currency: String,
        duration: String
    }
});

subjectMaster.index({'loc': '2dsphere'});

module.exports = mongo.model('subjectMaster', subjectMaster);