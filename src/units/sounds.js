const soundMap = {
  change: "./sound/change.mp3",
  confirm: "./sound/confirm.mp3",
  done: "./sound/done.mp3",
};
module.exports = {
  template: (state, data) => `<audio autoplay ="autoplay"></audio>`,
  beforeRender: function(dom, state, data){
    dom.src = soundMap[data];
  },
  afterRender: function(dom, state, data) {
    dom.play();
    dom.onended = function () {
      document.querySelector("body").removeChild(dom);
    }
  },
}
