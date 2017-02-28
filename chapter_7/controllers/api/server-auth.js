var User = require('../../models/user');
var config = require('../../config');
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var util = require('../util');

var router = express.Router();

var secretKey = 'superSecretKey';

console.log('in server-auth');

// 用户注册，在数据库存储hash值，而不是原密码
router.post('/user',function(req, res, next) {
	console.log(req.body);
	if(req.body.username){
		console.log('username not empty');
	}
	if(req.body.password){
		console.log('password not empty');
	}
	if(req.body.username && req.body.password){
		User.findOne({username: req.body.username}, function (err, user) {
			if(err) {
				console.log('/user[P]: isNameExist - 查询错误');
				console.log(err);
				return next(err);
			}
			if(!user) {
				console.log('/user[P]: isNameExist - 没有该用户');
				console.log('可以使用的用户名');
				//只要用使用了 User，mongoose 就会为其生成一个_id，而不需要等到存储进数据库之后再分配 _id
				var user = new User({username: req.body.username})
				//console.log('before save');
				//console.log(user);
				bcrypt.hash(req.body.password, 10, function (err, hash) {
					user.password = hash;
					console.log('hash后的密码: ',user.password);
					user.save(function (err, user) {
						if(err) {
							console.log('/user[P]: 数据库访问错误');
							throw next(err);
						}
						console.log(user);
						this.body = util.successRes(null, '用户创建成功');
						return res.send(this.body);
						//return res.send(201);
					});
					
				});
			}
			else{
				console.log('isNameExist: 该用户已存在');
				console.log('用户名已存在，请换用其他的的用户名');
				this.body = util.failureRes(null, '用户名已存在，请换用其他的的用户名');
				return res.send(this.body);
			}
		});
	}
	else {
		console.log('缺失用户名或密码');
		this.body = util.failureRes(null, '缺失用户名或密码');
		return res.send(this.body);
		//return res.send(401);
	}
	
});

/*
router.post('/session', function(req, res, next) {
	console.log(req.body);
	User.findOne({username: req.body.username}, function (err, user) {
		if(err) {
			console.log('/session[P]: error 1');
			console.log(err);
			return next(err);
		}
		if(!user) {
			console.log('/session[P]: 没有该用户');
			return res.send(401);
		}
		bcrypt.hash(req.body.password, 10, function (err, hash) {
			console.log('hash 后的密码');
			console.log(hash);
			console.log('保存的密码');
			console.log(user.password);
		});
		bcrypt.compare(req.body.password, user.password, function (err, valid) {
			if (err) {
				console.log('/session[P]: error 2');
				console.log(err);
				return next(err);
			}
			if (!valid) {
				console.log('/session[P]: 密码不匹配');
				return res.send(401);
			}
			var token = jwt.encode({username: user.username}, secretKey);
			res.json(token);
		});
	});
});
*/

router.get('/user', function (req, res) {
	var token = req.headers['x-auth'];
	var auth = jwt.decode(token, secretKey);
	User.findOne({username: auth.username}, function (err, user) {
		if (err) {
			console.log('/user[G]: error 1');
			console.log(err);
			return next(err);
		}
		res.json(user);
	});
});

//用户登录
router.post('/sessions', function (req, res, next) {
	console.log(req.body.username + ' is trying to login in');
	User.findOne({username: req.body.username})
	//因为password字段设置了"select: false"，所以不能直接通过find来获取了，必须要手动select
	.select('password').select('username')
	.exec(function (err, user) {
		if (err) {
			console.log('/sessions[P]: error 1');
			console.log(err);
			return next(err);
		}
		if (!user) {
			console.log('/sessions[P]: 没有该用户');
			return res.send(401);
		}
		bcrypt.hash(req.body.password, 10, function (err, hash) {
			console.log('hash 后的密码');
			console.log(hash);
			console.log('保存的密码');
			console.log(user.password);
		});
		//compare会自动hash第一个参数，并将结果与第二个参数比较
		bcrypt.compare(req.body.password, user.password, function (err, valid) {
			if (err) {
				console.log('/sessions[P]: error 2');
				console.log(err);
				return next(err);
			}
			if (!valid) {
				console.log('/sessions[P]: 密码不匹配');
				return res.send(401);
			}
			var token = jwt.encode({username: user.username}, config.secret);
			res.send(token);
		});
	});
});

module.exports = router;

























