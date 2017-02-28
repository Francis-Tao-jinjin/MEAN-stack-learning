var db = require('../db');

var user = db.Schema({
	username: {type: String, require: true},
	password: {type: String, require: true, select: false} //密码不能被返回
});

module.exports = db.model('User', user);