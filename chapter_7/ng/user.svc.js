angular.module('app')
.service('UserSvc', function ($http) {
	var svc = this;

	svc.currentUser = null;
	svc.isLogin = false;

	svc.setCurrentUser = function(user) {
		svc.currentUser = user;
		svc.isLogin = true;
	}

	svc.removeUser = function() {
		svc.currentUser = null;
		svc.isLogin = false;
	}

	svc.getUser = function () {
		return $http.get('/api/auth/user', {
			headers: { 'X-Auth': this.token }  //存储在service里面的token
		});
	}

	svc.logout = function () {
		this.token = null;
		svc.removeUser();
	}

	svc.login = function (username, password) {
		return $http.post('/api/auth/sessions', {
			username: username, 
			password: password
		}).then(function (val) {
			svc.token = val.data;
			
			console.log(val);
			return svc.getUser();
		})
	}

	svc.registry = function (username, password) {
		return $http.post('/api/auth/user', {
			username: username, 
			password: password
		}).then(function (result) {
			console.log('result: ');
			console.log(result);
			return result.data;
		});
	}
})