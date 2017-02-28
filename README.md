# MEAN-stack-learning 
## 该项目由阅读《Write Modern Web App with the MEAN Stack》时更随书本一同开发

该程序应用 websocket 做了一个简单的在线通讯的 demo

## 运行
```bash
# install dependencies
npm install

# serve at localhost:19919
gulp dev
```
在运行程序之前要先开启 mongodb
```bash
sudo mongod
```

书本的前面几章节有单独放在各个目录下，第7章及第7章之后全部放在 chapter_7 文件夹下。gulp 默认运行 chapter_7 的代码。

下面是项目结构示例 (chapter_7)：
```shell
├── config.js          # 用户注册时加密密钥
├── db.js              # 链接数据库
├── server.js          # express 服务器的创建
├── websockets.js      # 配置 websockets
├── assets        # 存放最终压缩的 js、css 文件的静态目录
│   └── ...       
├── controllers
│   ├── api       # server 处理 api 请求的各个模块 
│   ├── util      # 一些工具模块
│   └── static.js # 路由静态路径的配置
├── css           # 存放开发时的样式文件
│   └── ... 
├── models
│   └── ...       # 数据库的各个数据模型 
├── ng
│   └── ...       # AngularJs 程序 js 代码 
└── public
    └── ...       # AngularJs 程序 html 代码 
```

基本页面有：登录、注册、消息界面。
先注册后登陆，进入消息界面后可以发消息以及查看所有消息。

效果：
注册
![img1][img1]

登陆
![img2][img2]

消息界面
![img3][img3]

[img1]: ./img/signin.png
[img2]: ./img/login.png
[img3]: ./img/post.png
