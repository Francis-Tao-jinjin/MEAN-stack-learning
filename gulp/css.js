var gulp = require('gulp');
var stylus = require('gulp-stylus');

var theChapter =  require('../config');
var distAss = theChapter+'/assets';

gulp.task('css', function(){
	gulp.src('chapter_7/css/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('chapter_7/assets'))
});