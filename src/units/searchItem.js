const ajax = require("../../proxy/http.js");
const {createRender,timeout} = require("../tools/CreateRender.js");
const ShortCut = require("../tools/shortCut.js");
const fnMap = {
  13: function () {
    const body = document.querySelector("body")
    tempSound(body,"confirm");
    ajax.search({keywords: inputDom.value})(res=>{
      tempSound(body,"done");
      musicList = res.result.songs;
      play();
    })
  },
}
module.exports ={
  template: (state, data) =>{return `
  <li class="un-init">${data.name}</li>
  `},
  beforeRender: function(dom, state, data){},
  afterRender: function(dom, state, data) {},
}



