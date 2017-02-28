angular.module('app')
.controller('RegisterCtrl', function ($scope, UserSvc,api) {
	var regCtrl = this;
	
	regCtrl.registry = function (username, password) {
		UserSvc.registry(username, password)
		.then(function(result) {
			if(result.status == 'SUCCESS'){
				window.location.href = api.loginPageUrl;
			}
			else{
				alert('用户注册失败');
			}
		});
	}

	// $scope.login = function (username, password) {
	// 	UserSvc.login(username, password)
	// 	.then(function (user) {
	// 		console.log(user);
	// 		$scope.$emit('login', user.data);
	// 		//跳转到posts页面
	// 		window.location.href = api.postsPageUrl;
	// 	})
	// }
})