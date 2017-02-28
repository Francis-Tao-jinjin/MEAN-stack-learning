angular.module('app')
.controller('ApplicationCtrl', function ($scope,UserSvc, api) {
	var appCtrl = this;
	appCtrl.isLogin = false;

	$scope.$on('login', function (_, user) {
		UserSvc.setCurrentUser(user);
		appCtrl.currentUser = user;
		appCtrl.isLogin = true;
	})

	appCtrl.logout = function(){
		appCtrl.currentUser = null;
		appCtrl.isLogin = false;
		UserSvc.logout();
		window.location.href = api.loginPageUrl;
	}
})