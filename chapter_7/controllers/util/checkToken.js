// var User = require('../../models/user');
// var bcrypt = require('bcrypt');
// var jwt = require('jwt-simple');
// var util = require('../util');

// function checkToken(req, res) {
// 	var token = req.headers['x-auth'];
// 	var auth = jwt.decode(token, secretKey);
// 	User.findOne({username: auth.username}, function (err, user) {
// 		if (err) {
// 			console.log('/user[G]: error 1');
// 			console.log(err);
// 			return next(err);
// 		}
// 		res.json(user);
// 	});
// };