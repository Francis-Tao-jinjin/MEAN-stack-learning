exports.config = {
  framework: 'mocha',
  specs: [
    'test/e2e/**/*.spec.js'
  ],
  mochaOpts: {
    enableTimeouts: false
  },
  //自启动server，这样就不用每次先手动开启server了
  onPrepare: function () {
  	process.env.PORT = 19920;
  	require('./chapter_7/server');
  }
}