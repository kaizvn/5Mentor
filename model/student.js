/**
 * Created by HungNguyen on 8/1/15.
 */


var mongo = require('mongoose');

var comment = new mongo.Schema({
    teacher_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Teacher'
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


var student = mongo.Schema({
    user_info: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: [comment],
    subjects: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    activities: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Activities'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongo.model('Student', student);