/**
 * Created by HungNguyen on 8/1/15.
 */


var gulp = require('gulp'),
    connect = require('gulp-connect')
    , server = require('gulp-express')
    , nodemon = require('gulp-nodemon')
    , jshint = require('gulp-jshint');

gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./public/*.html'], ['html']);
    gulp.watch(['./api/*.js','./config/*', '.model/*'], ['develop']);
});

gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint())
});

gulp.task('develop', function () {
    nodemon({
        script: 'app.js'
        , ext: 'html js'
        , ignore: ['public/','./public/', __dirname + '/public']

    })
        .on('restart', function () {
            console.log('restarted!');
        })
});

gulp.task('default', ['develop']);