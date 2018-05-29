NodeJs+React+ES6+Webpack+SASS
========================================

简介:
---------------
竞猜前端代码
  
-------



安装:
----
- npm install 

运行与使用:
----
1. 使用命令行工具在该项目目录下使用npm运行程序,
启动项目命令
本地开发：`npm run h5dev`
联调环境：`npm run h5comb`
2. 默认是使用3000端口，若端口已占用可在主目录app.js文件中将3000端口换成未占用的端口，当命令行工具看到：Movie started on； port:3000时在游览器中输入localhost:3000即可看到项目主页;

联调阶段：
----
1. 配置hosts:
127.0.0.1      js.t.sinajs.cn

2. index.html 文件：
<!-- <script type="text/javascript" src="./build/assets/bundle.js"></script> -->
     <script type="text/javascript" src="./c2p/purchase/assets/bundle.js?v=3"></script>
3. 联调阶段：
启动项目命令`npm run comb`,包含了sudo 命令,需要输入密码
4. 默认使用80端口，若端口占用，需要启动linux 命令清理掉80进程

 

http://localhost

项目结构:
----
```
├── node_modules        node模块目录
├── src                 静态文件目录
│   ├── app             主目录
│   │   ├── index.js    入口文件，负责加载对应的js、css和router启动
│   │   │               （无业务）
│   │   ├── components  公共组件目录，如paging
│   │   ├── containers  页面布局和全局处理文件
│   │   │   └── app 
│   │   │       ├── App.jsx 
│   │   │       └── app.style.scss 
│   │   ├── models      这里面放的是数据，类似我们模拟接口的 api/xxx.json
│   │   ├── routes      路由，提供给 app/index.js使用
│   │   ├── style
│   │   └── views       各个模块目录
│   │       ├── about   （jsx、css、img放在对应目录下）
│   │       └── home 
│   └── assets          经过xx文件所在目录
│       ├── adaptive.js
│       └── zepto.js
├── README.md
├── server.hot.reload.js          文件
├── webpack.config.babel.js       webpack文件
├── webpack.hot.reload.config.babel.js     webpack.reload.config文件
├── webpack.production.config.babel.js     webpack.production.config文件
└── package.json
```