'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

var paths = {
  jshint: ['*.js'],
};

gulp.task('jshint', function() {
  return gulp.src(paths.jshint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jshint, ['jshint']);
});

gulp.task('dev', ['jshint'], function() {
});

gulp.task('default', ['watch', 'dev']);
