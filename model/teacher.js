/**
 * Created by HungNguyen on 8/1/15.
 */

var mongo = require('mongoose');

var comment = new mongo.Schema({
    student_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Student'
    },
    content: String,
    rating: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


var teacher = new mongo.Schema({
    teacher_info: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    skill_set: [String],
    comment: [comment],
    subjects: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    activities: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Activities'
    }],
    rate: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongo.model('Teacher', teacher);