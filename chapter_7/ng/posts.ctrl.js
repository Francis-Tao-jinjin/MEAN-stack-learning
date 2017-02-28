angular.module('app')
.controller('PostsCtrl', function ($scope, PostsSvc, UserSvc){
	/*
	PostsSvc.resource.get().promise.then(function(value){
		$scope.posts = posts;
	}, function(){
		console.log('Fetch ERROR');
	});
	*/
	var pstCtrl = this;

	pstCtrl.posts = [];
	
	PostsSvc.fetch().success(function (posts){
		pstCtrl.posts = posts;
	})
	.error(function (err){
		console.log(err);
	});

	console.log('currentUser: ',UserSvc.currentUser);
	
	pstCtrl.addPost = function(){
		console.log('in add post');
		console.log('postBody',pstCtrl.postBody);
		if(pstCtrl.postBody){
			PostsSvc.create({
				username: UserSvc.currentUser.username,
				body: pstCtrl.postBody
			})
			.success(function (post){
				console.log('addPost:',post);
				//pstCtrl.posts.unshift(post); 改由socket接受新消息
				pstCtrl.postBody = '';
			});
		}
	};

	$scope.$on('ws:new_post', function (_, post) {
		$scope.$apply(function () {
			console.log('ws:new_post',post.data);
			pstCtrl.posts.unshift(post.data);
		});
	});
});








