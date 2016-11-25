var http = require('http');

http.createServer(function(req,res){
	console.log('I Got A Request');
	res.writeHead(200,{"Content-Type": "text/plain"});
	res.write("Hello First Server");
	res.end();
}).listen(19919);