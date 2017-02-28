var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
// <<<<<<< HEAD

gulp.task('dev:server', function(){
	nodemon({
		script: 'chapter_7/server.js',
// =======

// gulp.task('dev:server', function(){
// 	nodemon({
// 		script: 'chapter_6/server.js',
// >>>>>>> caf776304aab7345c0e5a7b586f852c09f91c248
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	});
});