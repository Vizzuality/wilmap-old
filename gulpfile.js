var gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


gulp.task('imagemin', function () {
    return gulp.src('./themes/wilmap/images/*')
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
        }))
        .pipe(gulp.dest('./themes/wilmap/images'));
});


gulp.task('sass', function () {
  gulp.src('./themes/wilmap/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/wilmap/css'));
});


gulp.task('compress', () =>
    gulp.src(
      [
        './themes/wilmap/lib/main.js'
      ]
    )
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(minify())
        .pipe(gulp.dest('./themes/wilmap/js'))
);

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./themes/wilmap/sass/**/*.scss', ['sass']);
  gulp.watch('./themes/wilmap/lib/*.js', ['compress']);
  gulp.watch(['./themes/wilmap/css/style.css', './themes/wilmap/**/*.twig', './themes/wilmap/js/*.js'], function (files) {
      livereload.changed(files)
    });
});
