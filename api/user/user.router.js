/**
 * Created by HungNguyen on 8/1/15.
 */


var express = require('express')
    , controller = require('./user.controller');


var router = express.Router();

module.exports = function (app, root) {
    router.route('/user')
        .get(controller.getUser)
        .post(controller.register)
        .put(controller.update)
        .delete(controller.delete);

    router.get('/user/:username', controller.getUser);

    app.use(root, router);
};