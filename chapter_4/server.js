var express = require('express');
var bodyParser = require('body-parser');
var Post = require('./models/post');

var app = express();
app.use(bodyParser.json());

app.get('/api/posts', function(req, res, next){
	Post.find(function(err, posts){
		if(err){
			return next(err);
		}
		res.json(posts);
	});
	/*res.json([
		{
			username: 'dickeyxxx',
			body: 'node rocks!'
		}
	]);*/
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

app.listen(19919, function(){
	console.log('Server listening on', 19919);
});