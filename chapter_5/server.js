var express = require('express');
var bodyParser = require('body-parser');

//不使用express的router时
//var api = require('./controllers/api/posts-old');

//使用express的router时
var api_Posts = require('./controllers/api/posts');
var api_default = require('./controllers/static'); 

var app = express();
app.use(bodyParser.json());

//不使用express的router时
//api(app);

//使用express的router时(未使用命名空间的方法)
//app.use(api);

//使用express的router时(使用了命名空间的方法)
app.use('/api/posts',api_Posts);
app.use('/',api_default);
/*
app.get('/', function (req, res){
	console.log('Someone want to get home page');
	res.sendfile('chapter_5/public/layouts/posts.html');
});
*/
app.listen(19919, function(){
	console.log('Server listening on', 19919);
});