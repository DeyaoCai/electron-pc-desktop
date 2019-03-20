function Router() {
  this.history = [];
  this.confs = {};
}

Router.prototype.init = function (arr) {arr.forEach(item => this.confs[item.name] = item)}

Router.prototype.push = function (obj) {
  const route = this.confs[obj.name];
  route && (location.hash = route.path);
}
Router.prototype.replace = function (obj) {
  const route = this.confs[obj.name];
  route && (location.replace(location.href.replace(/#[^?]+/,"#" + route.path)));

}
const router = new Router();
const routeConf = [
  {name: "index", path: "/",callback:function(){console.log("index")}},
  {name: "home", path: "/home",callback:function(){console.log("home")}},
];
router.init(routeConf);
function hasechangeHandel(){
  const route = Object.keys(router.confs).map(item=>router.confs[item]).find(item => item.path === location.hash.replace(/#/,""));
  route && route.callback && route.callback();
}

window.addEventListener("hashchange", hasechangeHandel, false);

// router.push({name: "index"});
// setTimeout(function () {
//   router.replace({name: "home"});
// },200)
