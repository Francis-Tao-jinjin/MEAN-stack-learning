//使用 express 的 Router 时
var router = require('express').Router();
var Post = require('../../models/post');

//未使用命名空间的方法
//router.get('/api/posts', function(req, res, next){
//使用了命名空间的方法
router.get('/', function(req, res, next){
	Post.find()
	.sort('-date')  //同样是为了使posts按照日期排好
	.exec(function(err, posts){
		if(err){
			return next(err);
		}
		res.json(posts);
	});
});

//未使用命名空间的方法
//router.post('/api/posts', function(req, res, next){
//使用了命名空间的方法
router.post('/', function(req, res, next){
	console.log('post received!');
	console.log(req.body.username);
	console.log(req.body.body);
	var post = new Post({
		username: req.body.username,
		body: req.body.body
	});
	post.save(function (err, post){
		if(err){
			return next(err);
		}
		res.json(201, post);
	});
	//res.send(201);
});

module.exports = router;