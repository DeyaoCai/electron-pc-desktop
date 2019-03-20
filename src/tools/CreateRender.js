module.exports = {
  createRender(conf) {
    const state = conf.state ? conf.state() : {};
    createRender.wrap || (createRender.wrap = document.createElement("div"));
    function htmlConcator(data) {
      const innerHtml = conf.template(state,data);
      createRender.wrap.innerHTML = innerHtml;
      const dom = createRender.wrap.children[0];
      return {dom, conf, state};
    }
    return function (ele,data) {
      const conf = htmlConcator(data);
      conf.conf.beforeRender && conf.conf.beforeRender(conf.dom, state, data);
      ele.appendChild(conf.dom);
      conf.conf.afterRender && conf.conf.afterRender(conf.dom, state, data);
      return conf.dom;
    }
  },
  timeout(fn,time,times){
    return function timeouts() {
      if(times!==undefined && times<=0) return;
      fn();
      times!==undefined && times --;
      setTimeout(timeouts,time === undefined ? 1000 : time);
    }
  },

  animationEndDecorator(dom,notRemoveDomWhileAnimationEnd) {
    const list = [];
    let fn = function(){
      const animationFn = list.shift();
      if (animationFn) animationFn();
      else{
        dom.removeEventListener("webkitTransitionEnd",fn);
        fn = null;
        notRemoveDomWhileAnimationEnd || dom.parentNode && dom.parentNode.removeChild(dom);
      }
    }
    dom.addEventListener("webkitTransitionEnd",fn);
    return function add(fn) {list.push(fn);return add;}
  },
  range(start,width){
    return function () {return Math.round(Math.random()*width) + start - width/2;}
  },
}

