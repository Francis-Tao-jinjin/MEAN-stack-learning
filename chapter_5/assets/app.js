angular.module('app',[])
.controller('PostsCtrl', function ($scope, PostsSvc){
	PostsSvc.fetch().success(function (posts){
		$scope.posts = posts;
	})
	.error(function (err){
		console.log(err);
	});

	$scope.addPost = function(){
		if($scope.postBody){
			PostsSvc.create({
				username: 'dickeyxxx',
				body: $scope.postBody
			})
			.success(function (post){
				$scope.posts.unshift(post);
				$scope.postBody = '';
			});
		}
	};
})//把请求api的部分单独放在 service 里面，这样其他的controller和模块就都能使用了。
.service('PostsSvc', function ($http){
	this.fetch = function() {
		return $http.get('/api/posts');
	};
	this.create = function (post) {
		return $http.post('/api/posts', posts);
	};
})












