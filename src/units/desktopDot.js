const {animationEndDecorator, range} = require("../tools/CreateRender.js");
document.body.onmousemove = (ev) => {
  rangeCenterX = range(ev.clientX,sRangeWidth);
  rangeCenterY = range(ev.clientY,sRangeWidth);
  timeout(function () {
    tempB(document.querySelector("body"));
  },100,2)();
}
document.body.onclick = (ev) => {
  rangeCenterX = range(ev.clientX,sRangeWidth);
  rangeCenterY = range(ev.clientY,sRangeWidth);
  timeout(function () {
    tempB(document.querySelector("body"));
  },20,20)();
}
const sRangeWidth = 300;
const eRangeWidth = 1080;


let rangeCenterX = range(960,sRangeWidth);
let rangeCenterY = range(400,sRangeWidth);
const rangeTopRightX = range(1600,eRangeWidth);
const rangeTopRightY = range(400,eRangeWidth);
const rangeParticle = range(15,40);
const rangeTime = range(30,80);
const rangeText = range(1, 3);

function startBMove(item,state) {
  setTimeout(function () {
    item.style = state.style.replace(/(left|top): [^;]+;/,"") + `
        left: ${rangeTopRightX()}px;
        top: ${rangeTopRightY()}px;
        transform: rotate(${(Math.random() > .5 ? 1 : -1) * rangeTime()}deg) translate(${rangeParticle()*.3}, ${rangeTime()*.3});
        opacity: 0;
      `;
  },10)
}
const text = "LOVE";
function setBOriStyle(item,state) {
  const x = rangeCenterX();
  const y = rangeCenterY();
  const w = rangeParticle();
  const t = rangeTime();
  state.text = w < 60 ? w < 24 ? "" : text[Math.abs(Math.round(rangeText()))] : "LOVE";
  state.style = item.style = `
    background-position: -${x}px -${y}px;
    background-image: url("./img/${currentImgSrc}");
    left: ${x}px;
    top: ${y}px;
    width: ${w}px;
    height: ${w}px;
    font-size: ${w/3}px;
    line-height: ${w}px;
    border-radius: ${w > 80 && Math.random() > .5 ? 4 : w/2}px;
    transition: all ${t/10}s;
    transform: rotate(0deg) translate(0, 0);
    opacity: 1;
  `
}
module.exports = {
  template: (state, data) => `<b>${state.text ? state.text : ""}</b>`,
  beforeRender: setBOriStyle,
  afterRender: function(dom, state, data) {
    animationEndDecorator(dom);
    setTimeout(()=>{startBMove(dom,state)},0);
  },
}
