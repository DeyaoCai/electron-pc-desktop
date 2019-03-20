const cprocess = require('child_process');
const {createRender,timeout} = require("../tools/CreateRender.js");
let inputDom ;
const tempSound = createRender(require("./sounds.js"));

shortCut.alt(87,function(){
  inputDom && inputDom.focus();
});

const fnMap = {
  13: function () {
    tempSound(document.querySelector("body"),"confirm");
    cprocess.exec(`start https://www.baidu.com/s?wd=${encodeURI(inputDom.value)}`)
    inputDom.value = "";
  },
  27: () => inputDom.blur(),
}
module.exports ={
  template: (state, data) => `
    <div class="search-box">
    <img src="./icons/searchbox.png">
    <span>baidu</span>
    <input type="text" placeholder="百度搜索">
    </div>
  `,
  beforeRender: function(dom, state, data){},
  afterRender: function(dom, state, data) {
    inputDom = dom.querySelector("input");
    inputDom.oninput = inputDom.onchange = function(ev){
      timeout(function () {
        tempB(document.querySelector("body"));
      },10,10)();
    }
    inputDom.onfocus= function(){
      dom.className = "search-box focus";
      tempSound(document.querySelector("body"),"change");
    }
    inputDom.onblur= function(){
      dom.className = "search-box";
    }

    inputDom.onkeyup=function(ev){
      const fns = fnMap[ev.which];
      fns && fns();
    }
  },
}
