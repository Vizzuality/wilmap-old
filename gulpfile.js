const gulp = require('gulp');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglifyjs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');


gulp.task('imagemin', function () {
  return gulp.src('./themes/wilmap/images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [
      {
        removeViewBox: false
      }
    ],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('./themes/wilmap/images'));
});


gulp.task('sass', function () {
  gulp.src('./themes/wilmap/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/wilmap/css'));
});


gulp.task('uglify', function () {
  gulp.src('./themes/wilmap/lib/*.js')
    .pipe(uglify('main.js', 'select2.full.min.js'))
    .pipe(gulp.dest('./themes/wilmap/js'));
});

gulp.task('uglify', function () {
  gulp.src('./themes/wilmap/lib/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./themes/wilmap/js'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./themes/wilmap/sass/**/*.scss', ['sass']);
  gulp.watch('./themes/wilmap/lib/*.js', ['uglify']);
  gulp.watch(
    [
      './themes/wilmap/css/style.css',
      './themes/wilmap/**/*.twig',
      './themes/wilmap/js/*.js'
    ], function (files) {
    livereload.changed(files);
  });
});
