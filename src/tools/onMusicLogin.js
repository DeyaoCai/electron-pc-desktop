const ajax = require("../../proxy/http.js");
function getRecommendResource(){
  ajax.recommendResource()(res=>{
    console.log(res);
  })
}

module.exports = function () {
  getRecommendResource();
};
