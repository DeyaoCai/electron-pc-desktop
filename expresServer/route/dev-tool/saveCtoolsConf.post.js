const path = require('path');
const fs = require("fs");
module.exports = function (req, res) {
  const basePath = path.join(req.ctoolsOpt.devToolsDir, "./ctools.conf/savedBizConfs");
  const confList = fs.readdirSync(basePath);
  console.log(req.body);
  fs.writeFileSync(`${basePath}/${req.body.name}`, `module.exports = ${JSON.stringify(req.body.data)}`);
  // console.log(confList);
  // console.log(`post: `+JSON.stringify(req.body));
  res.send({
    data: null,
    code: 0,
    ok: true,
  });
}
;
