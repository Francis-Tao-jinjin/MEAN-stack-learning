var gulp = require('gulp');
var concat = require('gulp-concat');
// sourcemaps 方便调试
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var theChapter =  require('../config');

var srcJs = theChapter+'/ng/module.js';
var disJs = theChapter+'/ng/**/*.js';
var distAss = theChapter+'/assets';

gulp.task('js', function(){
	gulp.src(['chapter_7/ng/module.js','chapter_7/ng/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(ngAnnotate()) // 	!important 非常重要，一定要放在uglify之前
		.pipe(uglify())
		//没有经过annotate而直接minify的话，
		//angular的模块里面会找不到参数，就会出现‘Unkown Provider错误’
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('chapter_7/assets'));
});
