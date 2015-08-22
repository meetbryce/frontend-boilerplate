"use strict";

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var dist = "./dist";
var errorHandlerFactory = function (taskName) {
    return function (err) {
        notify.onError({
            title: "Gulp Error: " + taskName,
            message: "<%= error.message %>",
            sound: "Beep"
        })(err);

        this.emit('end');
    };
};


gulp.task('html', function () {
    return gulp.src('./**/*.htm')
        .pipe(connect.reload());
});

gulp.task('images', function () {
    var onError = errorHandlerFactory('images');

    return gulp.src('./src/img/*')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist + '/img'));
});

gulp.task('scripts', function () {
    var onError = errorHandlerFactory('scripts');

    return gulp.src('./src/js/app.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //.pipe(gulp.dest('./dist/js')) uncomment to create an un-minified version
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + '/js'))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    var onError = errorHandlerFactory('styles');

    return gulp.src('./src/scss/style.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['styles']);
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./**/*.htm', ['html']);
});

gulp.task('connect', function () {
    return connect.server({
        root: ['./'],
        livereload: true,
        fallback: './index.htm',
        host: '0.0.0.0'
    });
});

gulp.task('build', ['scripts', 'styles', 'html', 'images']);

gulp.task('default', ['build', 'watch', 'connect']);
