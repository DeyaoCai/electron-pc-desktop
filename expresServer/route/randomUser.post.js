module.exports = function (req, res) {
  const query = `
  insert into user (name, firstName, lastName, fullName, birthDay,gender, phone) values ("${Math.round(Math.random()*500)}", "45655", "456564", "456564", 456564,"1",54565);
  `;
  req.connection.query(query,  (error, results, fields) =>{
    res.send({ok: !error});
  });
};
