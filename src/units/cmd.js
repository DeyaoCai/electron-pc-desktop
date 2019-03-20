const ajax = require("../../proxy/http.js");
const {createRender,timeout} = require("../tools/CreateRender.js");
const ShortCut = require("../tools/shortCut.js");
const tempItem = createRender(require("./searchItem.js"));
const tempSound = createRender(require("./sounds.js"));
const cprocess = require('child_process');
const cmdfiles = baseTools.reatdDrir("./src/cmdFile",/\..*/);

shortCut.alt(69,function(){
  inputDom && inputDom.focus();
});
let domList = [];
let inputDom;
let ulDom;
let cmdList;

function onValChange(val) {
  cmdList = val ? cmdfiles.filter(item=> item.name.indexOf(val) + 1) : cmdfiles;
  ulDom.innerHTML = "";
  domList = cmdList.map((item,index) =>{
    const dom = tempItem(ulDom,item)
    setTimeout(function () {
      dom.className = dom.className.replace(/[ ]*un-init[ ]*/,"");
      index || (dom.className = "active");
    },index*100);
    return dom;
  })
}

function play(){
  const dom = domList[0];
  dom.className = "active";
  dom.className = "active";
  const index= Array.prototype.findIndex.call(ulDom.children,item => item === dom)
  ulDom.style.top = index*-30 +"px";
  inputDom.value = "";
}
function prev(){
  cmdList.unshift(cmdList.pop());
  domList.unshift(domList.pop());
  domList.forEach(item => item.className = "");
  play();
};
function next(){
  cmdList.push(cmdList.shift());
  domList.push(domList.shift());
  domList.forEach(item => item.className = "");
  play();
};


const fnMap = {
  13: function () {
    const body = document.querySelector("body");
    inputDom.value = "";
    cmdList[0] && cprocess.exec(`start ${cmdList[0].path}`)
    tempSound(body,"confirm");
  },
  38: prev,
  40: next,
  27: () => inputDom.blur(),
}

module.exports ={
  template: (state, data) => `
  <div class="search-box">
    <img src="./icons/searchbox.png">
    <span>cmd</span>
    <input type="text" placeholder="cmd">
    <ul></ul>
  </div>
`,
  beforeRender: function(dom, state, data){
  },
  afterRender: function(dom, state, data) {
    inputDom = dom.querySelector('input');
    ulDom = dom.querySelector('ul');
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
    inputDom.onkeyup = function(ev){
      const fns = fnMap[ev.which];
      fns && fns();
      fns || onValChange(inputDom.value);
    }
  },
}



