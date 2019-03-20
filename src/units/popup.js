
module.exports = {
  template: (state, data) => `<div class="comp-popup">
    <div class="comp-popup-inner">
    </div>
</div>`,
  beforeRender: function(dom, state, data){
    function click(){dom.className = "comp-popup";}
    function webkitTransitionEnd() {
      if (dom.className === "comp-popup") {
        dom.removeEventListener("webkitTransitionEnd", webkitTransitionEnd);
        dom.removeEventListener("click", click);
        dom.parentNode.removeChild(dom);
      }
    }
    dom.addEventListener("webkitTransitionEnd", webkitTransitionEnd);
    dom.addEventListener("click", click);
    data.slot(dom.querySelector(".comp-popup-inner"),data.data);
  },
  afterRender: function(dom, state, data) {
    setTimeout(function () {
      dom.className = "comp-popup active";
      data.delay && setTimeout(function () {
        dom.className = "comp-popup";
      }, data.delay+1000)
    },5)
  },
}
