module.exports = function (req, res) {
  console.log(`post: `+JSON.stringify(req.body));
  res.send({code:0,ok:true, data: req.body});
};
