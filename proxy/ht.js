const http = require('http');
const path = require('path');
const fs = require('fs');

function parseUrl(url) {
  var splitPathAndParams = url.split("?");
  var ret = {};
  var params = [];
  ret.path = splitPathAndParams[0];
  ret.params = {};
  splitPathAndParams[1] && (params = splitPathAndParams[1].split("&"));
  params.forEach(item => {
    var str = item.split("=");
    ret.params[str[0]] = str[1];
  });
  return ret;
}

const cheerio = require('cheerio');

function mkdir(dirpath, dirname) {
  // 判断是否是第一次调用
  if (typeof dirname === "undefined") {
    if (fs.existsSync(dirpath)) return;
    else {
      mkdir(dirpath, path.dirname(dirpath));
    }
  } else {
    // 判断第二个参数是否正常，避免调用时传入错误参数
    if (dirname !== path.dirname(dirpath)) {
      mkdir(dirpath);
      return;
    }
    if (fs.existsSync(dirname)) fs.mkdirSync(dirpath);
    else {
      mkdir(dirname, path.dirname(dirname));
      fs.mkdirSync(dirpath);
    }
  }
}
console.log(__dirname)
mkdir(path.join(__dirname, "../img"));
startLoad('http://www.netbian.com/', ret => {
  fs.writeFileSync(path.join(__dirname, "./list.json"), JSON.stringify(ret));
  loadSubPage(ret.map(item => item));
});

function startLoad(url, callback) {
  http.get(url, (res) => {
    const {statusCode,} = res;
    const contentType = res.headers['content-type'];
    let error;
    if (statusCode !== 200) error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
    if (!/^text\/html/.test(contentType)) error = new Error('无效的 content-type.\n' + `期望 text\/html 但获取的是 ${contentType}`);

    if (error) {
      console.error(error.message);
      // 消耗响应数据以释放内存
      res.resume();
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      const result = [];
      try {
        const $ = cheerio.load(rawData);
        Array.prototype.forEach.call($("#main .list li>a"), item => {
          const img = item.children[0];
          result.push({
            src: url + item.attribs.href,
            title: img.attribs.alt,
            img: img.attribs.src
          })
        })
        callback && callback(result);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
}

function loadImgs(list, dirpath) {
  const now = list.shift();
  now && http.get(now.img, (res) => {
    const {statusCode} = res;
    let error;
    if (statusCode !== 200) error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
    if (error) {
      console.error(error.message);
      // 消耗响应数据以释放内存
      res.resume();
      return;
    }
    res.setEncoding('binary');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        mkdir(dirpath);
        fs.writeFileSync(dirpath + "/" + new Date().getTime() + "." + now.img.split(".").pop(), rawData, "binary");
        setTimeout(() => {
          console.log("load img success! now start next mission!")
          loadImgs(list, dirpath);
        }, Math.random() * 3000 + 500)
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
}

function loadSubPage(list) {
  const now = list.shift();
  if (!now) return;
  const names = now.src.split("/");
  const name = names[names.length - 1].split(".")[0];
  const pathes = fs.readdirSync(path.join(__dirname, "../img/")).map(item => item.split(".")[0]);
  if (pathes.some(item => item === name)) return loadSubPage(list);
  http.get(now.src, (res) => {
    const {statusCode} = res;
    const contentType = res.headers['content-type'];
    let error;
    if (statusCode !== 200) error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
    if (!/^text\/html/.test(contentType)) error = new Error('无效的 content-type.\n' + `期望 text\/html 但获取的是 ${contentType}`);

    if (error) {
      console.error(error.message);
      // 消耗响应数据以释放内存
      res.resume();
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      console.log("loading subpage!");
      rawData += chunk;
    });
    res.on('end', () => {
      const result = [];
      try {
        const $ = cheerio.load(rawData);
        setTimeout(() => {
          console.log("load subpage success! now start next mission!")
          loadSubbPage(
            "http://www.netbian.com/" + $(".pic-down>a")[0].attribs.href,
            list,
            name
          );
        }, Math.random() * 3000 + 500)
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
}

function loadSubbPage(url, list, name) {
  http.get(url, (res) => {
    const {statusCode} = res;
    const contentType = res.headers['content-type'];
    let error;
    if (statusCode !== 200) error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
    if (!/^text\/html/.test(contentType)) error = new Error('无效的 content-type.\n' + `期望 text\/html 但获取的是 ${contentType}`);

    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      console.log("loading subbpage!");
      rawData += chunk;
    });
    res.on('end', () => {
      const result = [];
      try {
        const $ = cheerio.load(rawData);
        setTimeout(() => {
          console.log("load subbpage success! now start next mission!");
          loadImg($("#endimg a")[0].attribs.href, list, name);
        }, Math.random() * 3000 + 500)

      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
}

function loadImg(url, list, name) {
  http.get(url, (res) => {
    const {statusCode} = res;
    let error;
    if (statusCode !== 200) error = new Error('请求失败。\n' + `状态码: ${statusCode}`);

    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }
    res.setEncoding('binary');
    let rawData = '';
    res.on('data', (chunk) => {
      console.log("loading Img!");
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        mkdir(path.join(__dirname, "../img"));
        fs.writeFileSync(path.join(__dirname, "../img/" + name + "." + url.split(".").pop()), rawData, "binary");
        setTimeout(() => {
          console.log("load img success! now start next mission!")
          loadSubPage(list);
        }, Math.random() * 3000 + 500)
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
}

