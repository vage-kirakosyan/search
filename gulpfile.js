const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

function styles() {
  return gulp.src('./src/style.css')
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['>0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('./src/search.js')
    .pipe(concat('search.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
}

function clean() {
  return del(['public/*'])
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/*css', styles);
  gulp.watch('./src/*js', scripts);
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));