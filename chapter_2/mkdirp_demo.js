var mkdirp = require('mkdirp');
//在根目录下新建了一个 ‘temp’ 目录
mkdirp('./temp',function(err){
	if (err) {
		console.log(err);
	}else{
		console.log('pow!');
	}
});