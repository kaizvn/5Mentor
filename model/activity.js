/**
 * Created by HungNguyen on 8/1/15.
 */

var mongo = require('mongoose');

var activity = mongo.Schema({
    student_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Student'
    },
    teacher_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    subject_id: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    from_day: Date,
    to_day: Date,
    total_hour: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongo.model('Activity', activity);