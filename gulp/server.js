var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('dev:server', function(){
	nodemon({
		script: 'chapter_6/server.js',
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	});
});