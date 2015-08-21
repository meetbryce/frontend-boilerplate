"use strict";

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var dist = "./dist";

gulp.task('html', function () {
    gulp.src('./**/*.htm')
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src('./src/img/*')
        .pipe(imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist + '/img'));
});

gulp.task('scripts', function () {
    gulp.src('./src/js/app.js')
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
    gulp.src('./src/scss/style.scss')
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
