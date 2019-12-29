//jshint esversion:6

'use strict';

const gulp         = require( 'gulp' );
const autoprifixer = require( 'gulp-autoprefixer' );
const sass         = require( 'gulp-sass' );
const concat       = require( 'gulp-concat' );
const cleanCss     = require( 'gulp-clean-css' );
const imagemin     = require( 'gulp-imagemin' );
const sourcemaps   = require( 'gulp-sourcemaps' );
const rimraf       = require( 'rimraf' );

/**
 * Delete the "dist" folder every time a build starts
 */
gulp.task( 'clean', function(done) {
	rimraf( './dist', done );
});

/**
 * Compile CSS
 */
gulp.task( 'css', function() {
  return gulp.src( './src/scss/**/*.scss' )
    .pipe( sourcemaps.init() )
		.pipe( sass({
			outputStyle: 'compressed'
		})
		.on( 'error', sass.logError ) )
		.pipe( autoprifixer() )
		.pipe( cleanCss({ 
      compatibility: 'ie9' 
    }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './dist/css' ) );
});

/**
 * Compile JS
 */
gulp.task( 'js', function() {
  return gulp.src( './src/js/**/*.js' )
    .pipe( concat( 'app.js' ) )
    .pipe( gulp.dest( './dist/js' ) );
});

/**
 * Compile Images
 */
gulp.task( 'img', function() {
  return gulp.src( './src/img/**/*' )
    .pipe( imagemin() )
    .pipe( gulp.dest( './dist/img' ) );
});

/*
  Watch for changes
*/
gulp.task("watch", function() {
  gulp.watch( './src/scss/**/*.scss', gulp.parallel( 'css' ) );
  gulp.watch( './src/js/**/*.js', gulp.parallel( 'js' ) );
  gulp.watch( './src/img/**/*', gulp.parallel( 'img' ) );
});

/*
  Build function
*/
gulp.task( 'build',
  gulp.series( 'clean',
    gulp.parallel(
      'css',
      'js',
      'img'
    )
  )
);
