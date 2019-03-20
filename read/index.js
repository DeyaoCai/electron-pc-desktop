const read = require("./read.js");

const toolsConf = {
  inputPath: "./src/tools",
  outputPath: "./src/tools.js",
  fileReg: /\.js$/,
  importReg: /\/src/,
  exportReg: "",
  succMsg: "write tools success!",
  exportMode: "es6",
}
const compConf = {
  inputPath: ["./src/component", "./src/tools"],
  outputPath: "./src/index.js",
  fileReg: /\.(js|vue)$/,
  importReg: /\/src/,
  exportReg: "",
  succMsg: "write comp success!",
  exportMode: "es6",
}
const unitConf = {
  inputPath: "./src/unit",
  outputPath: "./src/unit.js",
  fileReg: /\.(js|vue)$/,
  importReg: /\/src/,
  exportReg: "",
  succMsg: "write comp success!",
  exportMode: "es6",
}

const viewConf = {
  inputPath: "./src/views",
  outputPath: "./src/router/conf.js",
  fileReg: /\.vue$/,
  importReg: /\/src/,
  exportReg: ".",
  succMsg: "write view success!",
  exportMode: "vueView",
  bizType: "train",
}

read.writeExportFile(toolsConf);
read.writeExportFile(compConf);
read.writeExportFile(unitConf);
read.writeExportFile(viewConf);
