let $audio;
const timeRate = 200;

function getFloat(num, by) {
  by || (by = 1);
  return Math.round(num / by) * by
}

let lrcTimeMap;
let lrcTimeList;
let uiDom;
let domList;
const {timeout} = require("../tools/CreateRender.js");
timeout(function () {
  if ($audio) {
    const curTime = getFloat($audio.currentTime * 1000, timeRate);
    const curLrc = lrcTimeMap[curTime]
    if (curLrc) {
      const index = lrcTimeList.indexOf(curLrc);
      uiDom.style = `transform: translateY(${-(index - 2) * 30}px);`;
      const prevLrc = uiDom.querySelector(".focus");
      prevLrc && (prevLrc.className = prevLrc.className.replace(/[ ]*focus[ ]*/g, ""));
      domList[index].className = domList[index].className.replace(/[ ]*focus[ ]*/g, "") + " focus";
    }
  }
}, 160)();

module.exports = {
  template: (state, data) => '<div class="lrc-txt"><ul>' + data.map(item => '<li>' + (item.name || "") + '</li>').join("") + '</ul></div>',
  beforeRender: function (dom, state, data) {
    $audio = document.querySelector("#audio");
    domList = dom.querySelectorAll("li");
    uiDom = dom.querySelector("ul");
    lrcTimeMap = {};
    lrcTimeList = data;
    data.forEach(item => {
      if (item.time) {
        const time = getFloat(item.time, timeRate);
        lrcTimeMap[time] = item;
      }
    })
  },
  afterRender: function (dom, state, data) {
    const lis = dom.querySelectorAll("li");
    Array.prototype.forEach.call(lis, (item, index) => {
      setTimeout(function () {
        item.className = "active";
      }, index * 100)
    })
  },
}
