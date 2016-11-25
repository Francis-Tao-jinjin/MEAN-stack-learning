//不使用 express 的 Router 时，直接把 api 函数放进一个导出模块即可
//server中使用的时候就是：
//	var api = require('./controllers/api/posts');
//	api(app);
var Post = require('../../models/post');

module.exports = function(app) {
	app.get('/api/posts', function(req, res, next){
		Post.find()
		.sort('-date')  //同样是为了使posts按照日期排好
		.exec(function(err, posts){
			if(err){
				return next(err);
			}
			res.json(posts);
		});
	});

	app.post('/api/posts', function(req, res, next){
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
}

