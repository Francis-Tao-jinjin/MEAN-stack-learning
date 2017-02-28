var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../public/templates'));

router.get('/', function(req,res){
	console.log('Someone want to get home page');
	res.sendfile('chapter_7/public/layouts/app.html');
});

module.exports = router;