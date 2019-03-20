create table user(
  id int AUTO_INCREMENT PRIMARY KEY unique key,
  name char(20),
  firstName char(20),
  lastName char(20),
  fullName char(40),
  birthDay int,
  gerder char(1),
  phone int
);

insert into user (name, firstName, lastName, fullName, birthDay,gender, phone) values ("465", "45655", "456564", "456564", 456564,"1",54565);
