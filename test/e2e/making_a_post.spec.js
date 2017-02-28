describe('making a post', function () {
  it('logs in and creates a new post', function () {
    // go to homepage
    //protractor测试的端口，不是代码真正在用的端口
    browser.get('http://localhost:19920');
    //通过css选择器的语法获取dom元素
    // click 'login'
    element(by.css('nav .login')).click();
    // 不暂停的话，肉眼看不出这个过程
    //browser.pause();
    // fill out and submit login form
    element(by.model('lgnCtrl.username')).sendKeys('thomas');
    element(by.model('lgnCtrl.password')).sendKeys('1234');
    element(by.css('form .btn')).click();
    // submit a new post on the posts page
    var post = 'Protractpr is testing';
    element(by.model('pstCtrl.postBody')).sendKeys(post);
    element(by.css('form .btn')).click();
    // the user should now see their post as the first post on the page
  	element.all(by.css('ul.list-group li')).first().getText()
  	.then(function(text) {
  		console.log(text);
  	})
  })
})