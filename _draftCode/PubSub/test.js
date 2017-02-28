var PubSub = require('./pubsub');

// 订阅
var callbackA = function () {
    console.log('event a happened')
};
PubSub.on('a', callbackA);
PubSub.on('b', function() {
    console.log('event b happened')
});

// 退订 , 第二个参赛传入回调函数的引用
PubSub.off('a', callbackA);

// 发布
PubSub.emit('a');
PubSub.emit('b');