const path =require("path");
const cwd = process.cwd();
module.exports = (oriPath) => {
  let index;
  try {
    index = require(`${cwd}/node_modules/${oriPath}/package.json`).main || `./index.js`;

    console.log(index)
  }catch(e){
    console.log(e)
    console.log(`no such module ${oriPath}!`)
  }
  if (!packageJson){
    console.log()
  }

  path.join(`/path`)
  return require("path");
}
