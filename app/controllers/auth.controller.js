const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/config");
const knex = require("../knex");
const userModel = require("../models/user.model");

exports.login = async (req, res) => {
  //Check if username and password are set
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }

  //Get user from the database
  const user = await knex("users")
    .where({ username })
    .first();
  if (!user) {
    res.status(401).send();
    return;
  }

  //Check crypted password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    res.status(401).send();
    return;
  }

  //Sign the JWT
  const jwtPayload = {
    id: user.id,
    username: user.username,
    fullName: user.fullname
  };
  const token = jwt.sign(jwtPayload, config.jwtSecret);

  //Send the JWT in the response
  res.send(token);
};

exports.changePassword = async (req, res) => {
  //Get ID from JWT
  const id = req.jwtPayload.id;

  //Get parameters from the body
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  //Check if old password matchs
  const user = await knex("users")
    .where({ id })
    .first();
  const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

  if (passwordIsValid) {
    //Hash the new password
    const password = bcrypt.hashSync(newPassword, 8);
    
    //Update in database
    await knex("users")
      .where({ id })
      .update({ password });
    res.status(204).send();
  } else res.status(400).send("Wrong password");
};
