var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', function(){
	gulp.src('chapter_6/css/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('chapter_6/assets'))
});