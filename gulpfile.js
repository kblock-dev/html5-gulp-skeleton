var config = require('./gulpconfig.js');
var source = config.source,
    output = config.output,
    site = config.site,
    path = config.path,
    bundles = config.bundles;

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    autoPrefixer = require('gulp-autoprefixer'),
    mincss = require('gulp-clean-css'),
    csslint = require('gulp-csslint'),
    cssComb = require('gulp-csscomb'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    inject = require('gulp-inject');

gulp.task('clean-css', function(){
  gutil.log(gutil.colors.red('Cleaning CSS files'));
  return gulp.src(site.css, {read: false})
      .pipe(rimraf());
});

gulp.task('clean-js', function(){
  gutil.log(gutil.colors.red('Cleaning JS files'));
  return gulp.src(site.js, {read: false})
             .pipe(rimraf());
});

gulp.task('clean', ['clean-css', 'clean-js']);

gulp.task('sass', ['clean-css'], function(){
  gutil.log('Compiling Sass');
  return gulp.src(source.sass)
      .pipe(sass().on('error', logError))
      .pipe(autoPrefixer())
      .pipe(cssComb())
      .pipe(csslint())
      .pipe(csslint.reporter())
      .pipe(rev())
      .pipe(gulp.dest(output.css))
      .pipe(rename({suffix: '.min'}))
      .pipe(mincss())
      .pipe(gulp.dest(output.css));
});

gulp.task('js', ['clean-js'], function(){
  gutil.log('Processing JS');
  return gulp.src(source.js, {base: './src/js'})
             .pipe(rev())
             .pipe(gulp.dest(output.js))
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(uglify())
             .pipe(gulp.dest(output.js));
});

gulp.task('jquery', function(){
  gutil.log('Copying jQuery');
  return gulp.src(source.jquery)
      .pipe(gulp.dest(output.jquery));
});

gulp.task('bootstrap-css', function(){
  gutil.log('Compiling bootstrap source files');
  //gutil.log(gutil.colors.red(source.bootstrap.scss));
  return gulp.src(source.bootstrap.scss)
      //.pipe(sass())
      .pipe(gulp.dest(output.src.bootstrap));
});

gulp.task('bootstrap-js', function(){
  gutil.log('Copying bootstrap javascripts');
  return gulp.src(source.bootstrap.js)
             .pipe(gulp.dest(output.bootstrap.js));
});

gulp.task('bootstrap-fonts', function(){
  gutil.log('Copying bootstrap fonts');
  return gulp.src(source.bootstrap.fonts)
             .pipe(gulp.dest(output.bootstrap.fonts));
});

gulp.task('bootstrap-images', function(){
  gutil.log('Copying bootstrap images');
  return gulp.src(source.bootstrap.images)
             .pipe(gulp.dest(output.bootstrap.images));
});

gulp.task('bootstrap', ['bootstrap-css', 'bootstrap-js', 'bootstrap-fonts', 'bootstrap-images']);

gulp.task('font-awesome-css', function(){
  return gulp.src(source.fontAwesome.css)
             .pipe(gulp.dest(output.fontAwesome.css));
});

gulp.task('font-awesome-fonts', function() {
    return gulp.src(source.fontAwesome.fonts)
               .pipe(gulp.dest(output.fontAwesome.fonts));
});

gulp.task('font-awesome', ['font-awesome-css', 'font-awesome-fonts']);
gulp.task('libraries', ['jquery', 'bootstrap', 'font-awesome']);

gulp.task('inject-css', ['sass'], function(){
  gutil.log(gutil.colors.green('Injecting CSS into layout'));
  var target = gulp.src(path.layout);
  var sources = gulp.src(bundles.css, {read: false}, {base: output.css});

  return target.pipe(inject(sources, {relative: true}))
               .pipe(gulp.dest(path.root));
});

gulp.task('inject-js', ['js'], function(){
  gutil.log(gutil.colors.green('Injecting JS into layout'));
  var target = gulp.src(path.layout);
  var sources = gulp.src(bundles.js, {read: false});

  return target.pipe(inject(sources, {relative: true}))
               .pipe(gulp.dest(path.root));
});

gulp.task('inject-modernizer', function(){
  gutil.log(gutil.colors.green('Injecting JS into layout'));
  var target = gulp.src(path.layout);
  var sources = gulp.src(bundles.modernizer, {read: false});

  return target.pipe(inject(sources), {name: "modernizer"})
               .pipe(gulp.dest(path.root));
});

gulp.task('inject', ['inject-css', 'inject-js']);

gulp.task('default',['jquery', 'bootstrap'], function() {
  gutil.log('Gulp is running');
  gulp.watch(source.sass, ['inject-css']);
  gulp.watch(source.js, ['inject-js']);
});

function logError(e){
  gutil.log(gutil.colors.red(e));
};
