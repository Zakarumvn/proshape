'use strict';


var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var copy = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');


var cfg = require('./gulp.config.json');

var mainDistDir = './../static/';
var bootstrapDistLibDir = mainDistDir + 'lib/bootstrap/';
var appDistDir = mainDistDir + 'app/';
var angularUITreeDir = mainDistDir + 'angularUITree/';


gulp.task('watch', function () {
    watch(cfg.filesToWatch, batch(function (events, done) {
        gulp.start('build-debug', done);
    }));
});


gulp.task('clean', function (callback) {
    return del([
        mainDistDir + '**/*',
        '!' + mainDistDir + '.gitignore'
    ], {force: true});
});

// proshape lib begin
gulp.task('create-single-proshape-lib-js', function () {
    return gulp.src(cfg.lib.proshape.js)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(appDistDir));
});

gulp.task('create-single-proshape-lib-css', function () {
    return gulp.src(cfg.lib.proshape.css)
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(appDistDir));
});

gulp.task('create-proshape-lib', ['create-single-proshape-lib-js', 'create-single-proshape-lib-css']);
// proshape lib end


gulp.task('create-proshape-js', function () {
    return gulp.src(cfg.proshape.js)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appDistDir));
});



gulp.task('copy-proshape-resources', function () {
    var assets = gulp.src(['assets/**/*']).pipe(gulp.dest(mainDistDir + 'assets/'));
    var appHtml = gulp.src(['app/**/*.html']).pipe(gulp.dest(appDistDir));
    var cssHtml = gulp.src(['app/**/*.css']).pipe(gulp.dest(appDistDir));
    //var cssMainHtml = gulp.src(['app/*.css']).pipe(gulp.dest(appDistDir));
    var descrJson = gulp.src(['descr.json']).pipe(gulp.dest(mainDistDir));
    var rootHtml = gulp.src(['*.html']).pipe(gulp.dest(mainDistDir));
    return merge(assets, appHtml, cssHtml, rootHtml, descrJson);
});
gulp.task('build-lib', ['create-proshape-lib']);

gulp.task('build-proshape', ['create-proshape-js', 'copy-proshape-resources']);

gulp.task('watch-develop', function () {
    watch(cfg.filesToWatch, batch(function (events, done) {
        gulp.start('build-proshape', done);
    }));
});

gulp.task('build-debug', [
    'build-lib',
    'build-proshape'
]);

gulp.task('minify-css', ['build-debug'], function () {
    var app = gulp.src(appDistDir + 'app.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '-min',
            extname: '.css'
        }))
        .pipe(gulp.dest(appDistDir));

    var proshapeLib = gulp.src(appDistDir + 'lib.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(appDistDir));

    return merge(app, proshapeLib);

});

gulp.task('uglify-js', ['build-debug'], function () {
    var app = gulp.src(appDistDir + 'app.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '-min',
            extname: ".js"
        }))
        .pipe(gulp.dest(appDistDir));

    var proshapeLib = gulp.src(appDistDir + 'lib.js')
        .pipe(uglify())
        .pipe(gulp.dest(appDistDir));

    return merge(app, proshapeLib);
});

gulp.task('create-mini-version', ['uglify-js', 'minify-css']);

gulp.task('build', ['build-debug', 'create-mini-version']);

gulp.task('default', ['build-debug']);

gulp.task('default', ['build']);