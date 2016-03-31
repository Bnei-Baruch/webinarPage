// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    nodemon = require('gulp-nodemon');

// Styles
gulp.task('styles', function() {
    return gulp.src('client/**/*.css')
        .pipe(gulp.dest('app/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('app/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['client/app.js', 'client/services/*.js', 'client/controllers/*.js', 'client/lib/*.js'])
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('app/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('client/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('app/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Templates
gulp.task('views', function() {
    return gulp.src('client/viewes/**/*')
        .pipe(gulp.dest('app/views'))
        .pipe(notify({ message: 'Views task complete' }));
});

// config
gulp.task('index', function() {
    return gulp.src('client/index.html').pipe(gulp.dest('app'));
});

// Clean
gulp.task('clean', function() {
    return del(['app']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'views', 'scripts', 'images', 'index');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('client/styles/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('client/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('client/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in app/, reload on change
    gulp.watch(['app/**']).on('change', livereload.changed);

});

gulp.task('server', function () {
  nodemon({
    script: './server/index.js'
  })
})