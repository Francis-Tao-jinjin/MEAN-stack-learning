var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

var websockets = require('./websockets');

//不使用express的router时
//var api = require('./controllers/api/posts-old');

//使用express的router时
var api_Posts = require('./controllers/api/posts');
var api_default = require('./controllers/static'); 
var api_userAuth = require('./controllers/api/server-auth');

var app = express();
app.use(bodyParser.json());

//不使用express的router时
//api(app);

//使用express的router时(未使用命名空间的方法)
//app.use(api);

//使用express的router时(使用了命名空间的方法)
app.use('/api/posts',api_Posts);
app.use('/',api_default);
app.use('/api/auth',api_userAuth);
/*
app.get('/', function (req, res){
	console.log('Someone want to get home page');
	res.sendfile('chapter_5/public/layouts/posts.html');
});
*/

// pick a port from an environment variable if it exists and 3000 otherwise
var port = process.env.PORT || 19919;
// http.Server object
var server = app.listen(port, function(){
	console.log('Server', process.pid, 'listening on', port);
});
websockets.connect(server);