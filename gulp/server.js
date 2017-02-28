var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var theChapter =  require('../config');

var theJs = theChapter+'/server.js'

gulp.task('dev:server', function(){
	nodemon({
		script: 'chapter_7/server.js',
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	});
});