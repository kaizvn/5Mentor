/**
 * Created by HungNguyen on 8/1/15.
 */


var express = require('express')
    , controller = require('./subject.controller');


var router = express.Router();

module.exports = function (app, root) {
    router.route('/subject')
        .get(controller.getSubject)
        .post(controller.addSubject)
        .put(controller.editSubject)
        .delete(controller.delete);

    router.get('/subject/:id', controller.getSubject);
    router.get('/subject/:id/:latitude/:longitude', controller.getSubjectByLocation);

    router.post('beMaster',controller.beSubjectMaster);
    router.post('beSeeker',controller.beSubjectSeeker);

    app.use(root, router);
};