const path = require('path');
// const getThirdModule = require(path.join(__dirname, `./src/tools/getThirdModule.js`));
// const express = getThirdModule('express');
const express = require('express');
const bodyParser = require('body-parser');

// 创建数据库连接 // 需要安装mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a13789',
  database: 'game'
});

const app = express();
app.use(function setHttpOptions(req, res, next) {
  req.ctoolsOpt = {
    devToolsDir: path.join(__dirname, '../../')
  };
  next();
});


// 跨域中间件
app.use(function crosHeaders(req, res, next) {
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  });
  next();
});

// 静态服务器 // 暂时不能去图片
app.use(express.static(path.join(__dirname, 'expresServer/www')));

// 数据库中间件
app.use(function addSQLConnection(req, res, next) {
  req.connection = connection;
  next();
});

// post 请求 body 解析
app.use(bodyParser());
app.use(bodyParser.json()); // contentType === application/json
app.use(bodyParser.urlencoded({ extended: true })); // contentType === application/x-www-form-urlencoded

const port = process.env.PORT || 9898; // 端口号

// 使用路由 //自己封装的方法 // 详见 ./expresServer/readRoutes.js
// 作用是 ./expresServer/route 目录开始，目录名（可嵌套）加文件名除去 .方法名.后缀名 即为匹配的地址，
// 也就是说写接口只需要复制一份然后修改里面的内容即可，无需配置其他；
require(`./expresServer/readRoutes.js`)(
  `${__dirname}/expresServer/route`,
  /.(get|post|option).js/i,
  item => item.replace(/(?:.*)(get|post|option)(?:.js)/i,`$1`),
  app
);

// 监听端口
app.server = app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`)
});
// 暴露出去，貌似没有意义；
module.exports = app;


