
module.exports = {
  template: (state, data) => `<div class="comp-tip"><span>${data.title}</span><span>${data.content}</span>
  </div>`,
  beforeRender: function(dom, state, data){
    dom.onclick = function () {
      document.querySelector("body").removeChild(dom);
    }
  },
  afterRender: function(dom, state, data) {
    dom.onended = function () {
      document.querySelector("body").removeChild(dom);
    }
  },
}
