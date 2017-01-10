var gulp = require('gulp');
var babel = require("gulp-babel");
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');




gulp.task('imagemin', function () {
    return gulp.src('./code/themes/wilmap/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./code/themes/wilmap/images'));
});


gulp.task('sass', function () {
  gulp.src('./code/themes/wilmap/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./code/themes/wilmap/css'));
});


gulp.task('uglify', function() {
  gulp.src('./code/themes/wilmap/lib/*.js')
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('./code/themes/wilmap/js'))
});

gulp.task("default", function () {
  return gulp.src('./code/themes/wilmap/lib/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./code/themes/wilmap/js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./code/themes/wilmap/sass/**/*.scss', ['sass']);
    gulp.watch('./code/themes/wilmap/lib/*.js', ['uglify']);
    gulp.watch(['./code/themes/wilmap/css/style.css', './code/themes/wilmap/**/*.twig', './code/themes/wilmap/js/*.js'], function (files){
        livereload.changed(files)
    });
});
