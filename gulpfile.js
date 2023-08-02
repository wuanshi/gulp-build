const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const filter = require('gulp-filter')

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  return gulp.src(['src/css/**/*.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('base', function () {
  return gulp.src('src/**/*')
  .pipe(filter(['./src/php/**/*', './src/*'], {
    dot: true
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.parallel('js', 'css', 'base'));