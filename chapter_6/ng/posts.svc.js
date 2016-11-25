angular.module('app')
//把请求api的部分单独放在 service 里面，这样其他的controller和模块就都能使用了
.service('PostsSvc', function ($http){
	this.fetch = function() {
		return $http.get('/api/posts');
	};
	this.create = function (post) {
		return $http.post('/api/posts', posts);
	};
});