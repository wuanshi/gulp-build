const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const filter = require('gulp-filter')
const browserify = require('browserify');
const through2 = require('through2');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const cheerio = require('gulp-cheerio')
const path = require('path');


gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(through2.obj(function (file, enc, cb) {
      browserify({
        entries: file.path,
        extensions: ['.js'],
        debug: true
      })
        .transform('babelify', {
          presets: ['@babel/preset-env']
        })
        .bundle((err, res) => {
          if (err) return cb(err)
          file.contents = res
          cb(null, file)
        })
        .pipe(source(file.path)) // 使用输入文件名作为输出文件名
        .pipe(buffer())
    }))
    // .pipe(uglify())
    .pipe(gulp.dest(path.resolve(__dirname, 'dist/js')));
})

// gulp.task('js', function() {
//   return gulp.src('src/js/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'));
// });

// gulp.task('js', function() {
//   return browserify({entries: 'src/js/index.js', extensions: ['.js'], debug: true})
//   .transform('babelify', {
//     presets: ['@babel/preset-env']
//   })
//   .bundle()
//   .pipe(source('bundle.js')) // 使用输入文件名作为输出文件名
//   .pipe(buffer())
//   .pipe(gulp.dest('dist/js'));
// })

gulp.task('css', function () {
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

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(cheerio(function ($, file) {
      console.log('file', file);
      // 遍历所有<script>标签
      $('script[type="module"]').each(function () {
        // 移除每个标签的type="module"属性
        $(this).removeAttr('type');
      });
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.parallel('js', 'css', 'base', 'html'));