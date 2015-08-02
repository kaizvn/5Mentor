/**
 * Created by HungNguyen on 8/1/15.
 */


module.exports = {
    server: {
        host: 'localhost',
        port: 3000
    },
    salt: 'wherewasiwhentherocketscometolifeandcarryyouawayintothealligatorsky',

    mongodb: {
        host: '104.199.181.18', //'localhost',
        port: 27017,
        database_name: 'ncct_dev',
        options: {
            db: {
                native_parser: true
            },
            server: {
                poolSize: 10
            },
            replset: {
                rs_name: ''
            },
            user: '',
            pass: ''
        }
    }
};