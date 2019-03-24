const path = require('path');
const fs = require("fs");
module.exports = function (req, res) {
  const basePath = path.join(req.ctoolsOpt.devToolsDir, "./ctools.conf/bizConfs");
  const confList = fs.readdirSync(basePath);
  console.log(confList);
  const retList  = confList.map(item => ({
    name: item,
    data:require(`${basePath}/${item}`)
  }));

  res.send({
    data: retList,
    code: 0,
  });
};
