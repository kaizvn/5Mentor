/**
 * Created by HungNguyen on 8/1/15.
 */


module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login'); //login page
    }
}