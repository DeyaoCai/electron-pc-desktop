module.exports = function (req, res) {
  console.log(`query: `+JSON.stringify(req.query));
  res.send('testGet！');
};
