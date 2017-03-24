const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint', () =>
    gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()));

gulp.task('test', () =>
    gulp.src('./test/**/*.js')
        .pipe(mocha()));

gulp.task('build', ['lint', 'test'], () =>
    gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./dist')));
