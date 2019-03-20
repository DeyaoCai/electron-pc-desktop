const {animationEndDecorator, range} = require("../tools/CreateRender.js");
const sRangeWidth = 300;
const eRangeWidth = 800;

const rangeCenterX = range(960,sRangeWidth);
const rangeCenterY = range(540,sRangeWidth);
const rangeTopRightX = range(1920,eRangeWidth);
const rangeTopRightY = range(100,eRangeWidth);
const rangeParticle = range(15,20);
const rangeTime = range(50,30);

function startBMove(item,state) {
  setTimeout(function () {
    item.style = state.style.replace(/(left|top): [^;]+;/,"") + `
        left: ${rangeTopRightX()}px;
        top: ${rangeTopRightY()}px;
        opacity: 0;
      `;
  },10)
}
function setBOriStyle(item,state) {
  const x = rangeCenterX();
  const y = rangeCenterY();
  const w = rangeParticle();
  const t = rangeTime();
  state.style = item.style = `
    background-position: -${x}px -${y}px;
    background-image: url("./img/${currentImgSrc}");
    left: ${x}px;
    top: ${y}px;
    width: ${w}px;
    height: ${w}px;
    transition: all ${t/10}s;
    opacity: 1;
  `
}
module.exports = {
  template: (state, data) => `<b></b>`,
  beforeRender: setBOriStyle,
  afterRender: function(dom, state, data) {
    animationEndDecorator(dom);
    setTimeout(()=>{startBMove(dom,state)},0);
  },
}
