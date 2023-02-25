'use strict';
const gulp = require('gulp');
const lessCss = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

exports.lescss = function () {
    return gulp.src('src/*.less')
        .pipe(lessCss())
        // .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
};

exports.watch = function () {
    gulp.watch('src/*.less', gulp.series('lescss'));
};



