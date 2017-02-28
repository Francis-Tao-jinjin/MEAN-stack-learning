var express = require('express');
var jwt = require('jwt-simple');
var app = express();
//lodash 可以在传送过来的的数据中查找我们要的字段和值
var _ = require('lodash');
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');

//如果没有 bodyparser的话，是无法进行http请求解析的
app.use(bodyParser.json());

var usersOld = [{username: 'thomas', password: 'pass'},
			 {username: 'dickeyxxx', password: '123'},
			 {username: 'Peter', password: 'spider'}];

var users = [{username: 'thomas', password: '$2a$10$Shwo1bUvqmLMeJ8sZhzfY.lXe1iUSYi2nyi1JvKmx5UACWgzaGKR2'}];

var secretKey = 'supersecretkey';

function findUserByUsername(username) {
	return _.find(users, {username: username});
};

function validateUserOld(user, password) {
	return user.password === password;
};

function validateUser(user, password, cb){
	bcrypt.compare(password, user.password, cb);
};

app.post('/session', function(req, res){
	console.log(req.body.username);
	console.log(req.body.password);
	
	var user = findUserByUsername(req.body.username);
	console.log(user);
	validateUser(user, req.body.password, function (err, valid) {
		if(err || !valid) {
			return res.send(401);
		}
		var token = jwt.encode({username: user.username}, secretKey);
		res.json(token);
	});
	/*
	if(!validateUser(user, req.body.password)) {
		return res.send(401); // Unauthorized
	}
	var token = jwt.encode(
		{username: user.username},
		secretKey);

	res.json(token);
	*/
});

app.get('/user', function(req, res){
	var token = req.headers['x-auth'];
	var user = jwt.decode(token, secretKey);
	// TODO: pull user info from database
	res.json(user);
});
/*
未使用 lodash
app.post('/session', function(req,res){
	var username = req.body.username;s
	var token = jwt.encode({username: username}, secretKey);
	res.json(token);
});

app.get('/user', function(req,res){
	var token = req.headers['x-auth'];
	var user = jwt.decode(token, secretKey);
	res.json(user);
});
*/
app.listen(3000);