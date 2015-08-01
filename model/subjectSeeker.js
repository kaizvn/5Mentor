/**
 * Created by HungNguyen on 8/2/15.
 */


var mongo = require('mongoose');


var subjectSeeker = mongo.Schema({
    subject_info: {
        type: mongo.Schema.Types.ObjectId, ref: 'Subject'
    },
    person_info: {type: mongo.Schema.Types.ObjectId, ref: 'Student'},
    location: String,
    description: String,
    loc: {
        type: {type: String, default: "Point"},
        "coordinates": [Number]
    }
});

subjectSeeker.index({'loc': '2dsphere'});

module.exports = mongo.model('subjectSeeker', subjectSeeker);