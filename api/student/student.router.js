/**
 * Created by HungNguyen on 8/1/15.
 */


var express = require('express')
    , controller = require('./student.controller');


var router = express.Router();

module.exports = function (app, root) {
    router.route('/student')
        .get(controller.getStudent)
        .post(controller.beStudent)
        .put(controller.put)
        .delete(controller.delete);

    router.get('/student/:id',controller.getStudent);

    app.use(root, router);
};