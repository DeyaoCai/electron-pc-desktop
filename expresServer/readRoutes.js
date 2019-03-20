const fs = require('fs');
const express = require('express');
const multer = require('multer');

function _readDir(path, reg, methodParseFn, app) { // path 读取的目录， reg 文件匹配的正则， result 为结果集
  const pathes = fs.readdirSync(path);
  const fileReg = /\./;
  const nextApp = express();
  pathes.forEach(item => {
    if (fileReg.test(item)) { // 判断是否为文件
      if (reg.test(item)) {
        const method = methodParseFn(item).toLowerCase();
        const param = [`/${item.replace(reg, ``)}`, require(`${path}/${item}`)];
        if (method === `post`) {
          param.splice(1, 0, multer().array());
        }
        app[method].apply(app, param);
      }
    } else {
      app.use(`/${item}`, nextApp);
      _readDir(path + "/" + item, reg, methodParseFn, nextApp); // 文件夹的话 就往下读取
    }
    app.use(express.static(`${__dirname}/proxy/www`))
  });
}

/**
 @path: 路由文件目录；
 @reg: 匹配文件后缀的正则,小写 或者加上 i，如：  /.(get).js/i
 @methodParseFn： 从文件名获取路由请求方法的方法， 如： fileName => fileName.replace(/(?:.*)(get|post|option)(?:.js)/i,`$1`);
  fileName = testGet.get.js => testGet;
 app: 任意(您需要使用这些路由)的 express() 的返回值
 */
module.exports = function readDir(path, reg, methodParseFn, app) { // path 读取的目录， reg 文件匹配的正则 返回一个 读取完的数组
  const result = [];
  _readDir(path, reg, methodParseFn, app);
  return result;
};
