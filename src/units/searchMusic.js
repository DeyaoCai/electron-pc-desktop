const ajax = require("../../proxy/http.js");
const {createRender,timeout} = require("../tools/CreateRender.js");
const $shortCut = require("../tools/shortCut.js")();

const tempB = createRender(require("./desktopDot.js"));
const tempSound = createRender(require("./sounds.js"));
const tempLrc = createRender(require("./lrc.js"));
const tempItem = createRender(require("./searchItem.js"));
shortCut.alt(81,function(){
  inputDom && inputDom.focus();
});
let musicList = [];
let domList = [];
let confs = {
  audio: document.querySelector("#audio")
};
let inputDom;
let ulDom;
confs.audio.volume = .1;
ajax.loginCellphone({phone: "16621079485", password: "a13789",})(res => {
  ajax.recommendSongs()(res => {
    musicList = res.recommend;
  })
});
let prevLrcl;
let $audio;
function play(setSrc){
  const song = musicList[0];
  setSrc || musicList && musicList.length && ajax.lyric({id: song.id})(res=>{
    const lrcList = res.lrc.lyric.split(/\n/).map(item => {
      const info = item.match(/(?:\[)(\d+)(?::)([^\]]+)(?:\])([^\[\]]*)/);
      return {
        name: info ? info[3] : "",
        time: info ? (info[1]*60000 +info[2]*1000) : 0,
      }
    });
    const body = document.querySelector("body");
    prevLrcl && body.removeChild(prevLrcl);
    prevLrcl = tempLrc(body, lrcList);
  })
  setSrc || musicList && musicList.length && ajax.songUrl({id: song.id})(res=>{
    inputDom.placeholder = song.name;
    confs.audio.src = res.data[0].url;
    domList[0].className = "active";
    const index= Array.prototype.findIndex.call(ulDom.children,item => item === domList[0])
    ulDom.style.top = index*-30 +"px";
  });
  inputDom.value = "";
  if (setSrc) {
    domList[0].className = "active";
    const index= Array.prototype.findIndex.call(ulDom.children,item => item === domList[0])
    ulDom.style.top = index*-30 +"px";
  }
}
function prev(){
  musicList.unshift(musicList.pop());
  domList.unshift(domList.pop());
  domList.forEach(item => item.className = "")
  play(true);
};
function next(){
  musicList.push(musicList.shift());
  domList.push(domList.shift());
  domList.forEach(item => item.className = "")
  play(true);
};
function volAdd() {
  let vol = confs.audio.volume + .05;
  if(vol > 1) vol = 1;
  confs.audio.volume = vol;
}
function volDec() {
  let vol = confs.audio.volume - .05;
  if(vol < 0) vol = 0;
  confs.audio.volume = vol;
}
function left(ev){
  if (inputDom.value === ""){
    const time = $audio.currentTime - 5;
    $audio.currentTime = time > 0 ? time : 0;
  }
}
function right(ev){
  if (inputDom.value === ""){
    const time = $audio.currentTime + 5;
    const duration = $audio.duration;
    $audio.currentTime = time < duration ? time : duration;
  }
}
function search(){
  const body = document.querySelector("body");
  tempSound(body,"confirm");
  inputDom.value && ajax.search({keywords: inputDom.value})(res=>{
    tempSound(body,"done");
    musicList = res.result.songs;
    domList = [];
    ulDom.innerHTML = "";
    musicList.forEach((item,index)=>{
      const dom = tempItem(ulDom,item)
      domList.push(dom);
      setTimeout(function () {
        dom.className = dom.className.replace(/[ ]*un-init[ ]*/,"");
      },index*100)
    });
    domList.forEach((item,index)=>{

    })
    play();
  })
}
confs.audio.onended = () => {next();play();};
const fnMap = {
  13: search,
  38: () => {prev();play();},
  40: () => {next();play();},
  27: () => inputDom.blur(),
}
const altFnMap = {
  13: play,
  37: left,
  38: prev,
  39: right,
  40: next,
}
const ctrlFnMap = {
  38: volAdd,
  40: volDec,
}

module.exports ={
  template: (state, data) => `
  <div class="search-box">
    <img src="./icons/searchbox.png">
    <span>music</span>
    <input type="text" placeholder="网易云音乐">
    <ul></ul>
  </div>
`,
  beforeRender: function(dom, state, data){
    $audio = document.querySelector("#audio");
    inputDom = dom.querySelector('input');
    $shortCut.init(inputDom);
  },
  afterRender: function(dom, state, data) {
    Object.keys(altFnMap).forEach(item => $shortCut.alt(item*1,altFnMap[item]));
    Object.keys(ctrlFnMap).forEach(item => $shortCut.ctrl(item*1,ctrlFnMap[item]));

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
      ev.altKey || ev.altKey || ev.shiftKey || fns && fns(ev);
    }
  },
}



