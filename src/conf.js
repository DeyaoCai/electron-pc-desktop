const fs = require("fs");
const cprocess = require('child_process');
// fs.readdirSync("./cmdFile");
console.log(baseTools)
const cmdfiles = baseTools.reatdDrir("./src/cmdFile",/\..*/);
cprocess.exec(`start ${cmdfiles[0].path}`)
module.exports = function () {

}
