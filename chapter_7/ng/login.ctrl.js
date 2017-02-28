angular.module('app')
.controller('LoginCtrl', function ($scope, UserSvc,api) {
	var lgnCtrl = this;

	lgnCtrl.login = function (username, password) {
		UserSvc.login(username, password)
		.then(function (user) {
			console.log('LoginCtrl user:',user);
			$scope.$emit('login', user.data);
			UserSvc.setCurrentUser(user.data);
			//跳转到posts页面
			window.location.href = api.postsPageUrl;
		})
	}
})