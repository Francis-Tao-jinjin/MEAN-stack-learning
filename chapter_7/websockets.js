var ws = require('ws');
var _ = require('lodash');
var clients = []

exports.connect = function (server) {
	var wss = new ws.Server({server: server});
	wss.on('connection', function (ws) {
		//track all the clients in an array
		clients.push(ws); 
		exports.broadcast('new client joined');
		//wscat -c ws://localhost:19919
		//ws.send('hello!');
		ws.on('close',function () {
			_.remove(clients, ws);
		})
	});
}

//broadcast msg to all clients
exports.broadcast = function (topic, data) {
	var json = JSON.stringify({topic: topic, data: data});
	clients.forEach(function (client) {
		client.send(json);
	})
}