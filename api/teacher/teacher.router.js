/**
 * Created by HungNguyen on 8/1/15.
 */


var express = require('express')
    , controller = require('./teacher.controller');


var router = express.Router();

module.exports = function (app, root) {
    router.route('/teacher')
        .get(controller.getTeacher)
        .post(controller.beTeacher)
        .put(controller.put)
        .delete(controller.delete);

    router.get('/teacher/:id', controller.getTeacher);

    app.use(root, router);
};