const getType = require("../../read/type.js");

const keyMap = {
  "0":"96","1":"97","2":"98","3":"99","4":"100","5":"101","6":"102","7":"103","8":"104","9":"105",

  "a":"65","b":"66","c":"67","d":"68","e":"69","f":"70","g":"71",
  "h":"72","i":"73","j":"74","k":"75","l":"76","m":"77","n":"78",
  "o":"79","p":"80","q":"81",
  "r":"82","s":"83","t":"84",
  "u":"85","v":"86","w":"87",
  "x":"88","y":"89","z":"90",

  "f1":"112","f2":"113","f3":"114","f4":"115",
  "f5":"116","f6":"117", "f7":"118","f8":"119",
  "f9":"120","f10":"121","f11":"122","f12":"123",

  "+":"107","-":"109","*":"106","/":"111",".":"110",

  "backspace":"8","tab":"9",
  "clear":"12","enter":"13",
  "esc":"27","spacebar":"32",
  "left arrow":"37","up arrow":"38", "right arrow":"39","dw arrow":"40",

  ";:":"186","<":"188", "=+":"187", "-_":"189", ">":"190","/?":"191", "`~":"192",

  "page up":"33", "page down":"34",
  "end":"35","home":"36",
  "insert":"45","delete":"46",

  "cape lock":"20",
  "num lock":"144",

  "[{":"219","\\|":"220",
  "]}":"221","'\"":"222",

  "shift":"16","control":"17","alt":"18",

  "搜索":"170","收藏":"171","浏览器":"172",
  "音量减":"174","音量加":"175","静音":"173","停止":"179",
  "邮件":"180",
};
const ShortCut = function(){this.maps = {shift: {}, ctrl: {}, alt: {},}}
ShortCut.prototype.init = function(dom){
  const $body = dom || document.querySelector("body");
  $body.onkeydown =  ev => {
    event.shiftKey && this.maps.shift[ev.which] && this.maps.shift[ev.which](ev);
    event.ctrlKey && this.maps.ctrl[ev.which] && this.maps.ctrl[ev.which](ev);
    event.altKey && this.maps.alt[ev.which] && this.maps.alt[ev.which](ev);
  }
}
ShortCut.prototype.shift = function (keyNum, cb) {
  getType.isNumber(keyNum) || (keyNum = keyMap[keyNum]);
  this.maps.shift[keyNum] = (ev) => {cb(); ev.stopPropagation();ev.preventDefault();}
}
ShortCut.prototype.ctrl = function (keyNum, cb) {
  getType.isNumber(keyNum) || (keyNum = keyMap[keyNum]);
  this.maps.ctrl[keyNum] = cb;
}
ShortCut.prototype.alt = function (keyNum, cb) {
  getType.isNumber(keyNum) || (keyNum = keyMap[keyNum]);
  this.maps.alt[keyNum] = cb;
}
const shortCut = function(){return new ShortCut()};
module.exports = shortCut;
