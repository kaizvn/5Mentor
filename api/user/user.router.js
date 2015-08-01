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
        .put(controller.put)
        .delete(controller.delete);

    app.use(root, router);
};