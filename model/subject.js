/**
 * Created by HungNguyen on 8/1/15.
 */


var mongo = require('mongoose');

var subject = mongo.Schema({
    name: {type: String, require: true},
    image_url: {type: String, default: 'url_default.jpg'},
    short_desc: String,
    match_skills: [String],
    teachers: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'subjectMaster'
    }],
    students: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'subjectSeeker'
    }],
    available: {type: Boolean, default: false}
});

/*db.items.createIndex({"loc":"2dsphere"})*/


/*subject.pre('save', function (next) {
 if (this.isNew && Array.isArray(this.loc.coordinates) && 0 === this.loc.coordinates.length) {
 this.loc.coordinates = undefined;
 }
 next();
 });*/

module.exports = mongo.model('Subject', subject);