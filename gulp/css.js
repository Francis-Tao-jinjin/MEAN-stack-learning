var gulp = require('gulp');
var stylus = require('gulp-stylus');

// <<<<<<< HEAD

gulp.task('css', function(){
	gulp.src('chapter_7/css/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('chapter_7/assets'))
// =======
// gulp.task('css', function(){
// 	gulp.src('chapter_6/css/**/*.styl')
// 		.pipe(stylus())
// 		.pipe(gulp.dest('chapter_6/assets'))
// >>>>>>> caf776304aab7345c0e5a7b586f852c09f91c248
});