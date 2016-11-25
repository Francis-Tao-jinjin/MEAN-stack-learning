var gulp = require('gulp');
/*
var concat = require('gulp-concat');
// sourcemaps 方便调试
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
*/
//用来读取./gulp目录下的全部task
var fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function(task){
	require('./gulp/' + task);
});


gulp.task('wellcome',function(){
	console.log('wellcome to gulp!');
});

gulp.task('hello',['wellcome'], function(){
	console.log('hello world');
	//say hello world;
});

gulp.task('watch:js',['js'],function(){
	gulp.watch('chapter_6/ng/**/*.js',['js']);
});

gulp.task('watch:css',['css'], function(){
	gulp.watch('chapter_6/css/**/*.styl',['css']);
});

gulp.task('dev',['watch:css','watch:js','dev:server']);