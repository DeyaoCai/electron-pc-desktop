module.exports ={
  template: (state, data) => `<img></img>`,
  beforeRender: function(dom, state, data){ this.startImg(dom,state)},
  afterRender: function(dom, state, data) { setTimeout(()=>{this.startImgMove(dom,state)},200)},
  startImg: function startImg(dom) {
    dom.src="./img/"+currentImgSrc;
    let fn = function(){
      dom.removeEventListener("webkitTransitionEnd",fn);
      prevImg && document.querySelector("body").removeChild(prevImg);
      prevImg = dom;
      fn = null;
    }
    dom.addEventListener("webkitTransitionEnd",fn );
  },
  startImgMove: function startImgMove(item,state) {
    item.style  = `
  opacity: 1;
`
  }
}
