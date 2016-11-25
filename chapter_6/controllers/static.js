var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));

router.get('/', function(req,res){
	console.log('Someone want to get home page');
	res.sendfile('chapter_6/public/layouts/posts.html');
});

module.exports = router;