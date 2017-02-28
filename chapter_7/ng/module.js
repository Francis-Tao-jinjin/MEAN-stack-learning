angular.module('app',[
	'ngRoute',
	'ngResource'])

.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'PostsCtrl as pstCtrl',
		templateUrl: 'posts.html'
	})
	.when('/register', {
		controller: 'RegisterCtrl as regCtrl',
		templateUrl: 'register.html'
	})
	.when('/login', {
		controller: 'LoginCtrl as lgnCtrl',
		templateUrl: 'login.html'
	})

})
.service('api', function () {
	this.postsPageUrl = 'http://localhost:19919/#/';
	this.loginPageUrl = 'http://localhost:19919/#/login';
	this.registerPageUrl = 'http://localhost:19919/#/register';	
})
.service('WebSocketSvc', function ($rootScope, $window) {
	
	function webSocketHost() {
		if($window.location.protocol === 'https:') {
			return "wss://" + window.location.host;
		}
		else {
			return "ws://" + window.location.host;
		}
	}

	var connection;
	this.connect = function () {
		connection = new WebSocket(webSocketHost());

		connection.onclose = function (e) {
			console.log('WebSocket closed. Reconnecting...');
			//如果socket断开，可以通过timeout每隔10s常识重新链接
			$timeout(connect, 10*1000);
		}

		connection.onopen = function () {
			console.log('WebSocket connected');
		}

		connection.onmessage = function (e) {
			console.log(e);
			var payload = JSON.parse(e.data);
			$rootScope.$broadcast('ws:' + payload.topic, payload);
		}
	}

	this.send = function (topic, data) {
		var json = JSON.stringify({topic: topic, data: data});
		connection.send(json);
	}
})
.run(function (WebSocketSvc) {
	WebSocketSvc.connect();
});
// .run(function ($rootScope, $timeout) {
// 	//将操作放在connect函数里面（可以在内部调用自身）
// 	(function connect() {
// 		var url = 'ws:localhost:19919';
// 		var connection = new WebSocket(url);

// 		connection.onclose = function (e) {
// 			console.log('WebSocket closed. Reconnecting...');
// 			//如果socket断开，可以通过timeout每隔10s常识重新链接
// 			$timeout(connect, 10*1000);
// 		}

// 		connection.onopen = function () {
// 			console.log('WebSocket connected');
// 		}

// 		connection.onmessage = function (e) {
// 			console.log(e);
// 			var payload = JSON.parse(e.data);
// 			$rootScope.$broadcast('ws:' + payload.topic, payload);
// 		}
// 	})()
// });






















