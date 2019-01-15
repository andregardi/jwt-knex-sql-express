const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const knex = require("../knex");

exports.listAll = async (req, res) => {
  const users = await knex("users");
  res.send(users);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  const user = await knex("users")
    .where({ id })
    .first();
  if (user) res.send(user);
  else res.status(404).send("User not found");
};

exports.newUser = async (req, res) => {
  //Check if all parameters have been sent
  let { username, password, fullname, role } = req.body;
  if (!(username && password && fullname && role)) {
    res.status(400).send();
  }

  //Hash the password
  password = bcrypt.hashSync(password, 8);

  //Create new user
  try {
    await knex("users").insert({ username, password, fullname, role });
  } catch (error) {
    res.status(400).send(error.stack);
    return;
  }

  //Send response
  res.status(201).send("User created");
};

exports.editUser = async (req, res) => {
  //Get the ID from the url
  const id = req.params.id;

  //Get values from the body
  const { username, fullname, role } = req.body;
  //Check if all parameters have been sent
  if (!(username && fullname && role)) {
    res.status(400).send();
  }

  let user = {};
  user.username = username;
  user.fullname = fullname;
  user.role = role;

  try {
    var updated = await knex("users")
      .where({ id })
      .update(user);
  } catch (error) {
    res.send(error.stack);
    return;
  }

  if (updated > 0) res.status(204).send();
  else res.status(404).send("User not found");
  // if (userModel.edit(id, user)) res.status(204).send();
  // else res.status(404).send("User not found");
};

exports.removeUser = async (req, res) => {
  const id = req.params.id;
  let deleted = await knex("users")
    .where({ id })
    .del();
  if (deleted > 0) res.status(204).send();
  else res.status(404).send("User not found");
};
