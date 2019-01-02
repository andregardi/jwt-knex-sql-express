const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const knex = require("../knex/knex");

const config = require("../config/config");

exports.login = async (req, res) => {
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }
  const user = await knex("users")
    .where({ username })
    .first();
  if (!user) {
    res.status(401).send();
    return;
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    res.status(401).send();
    return;
  }
  res.send(
    jwt.sign(
      { userId: user.id, username: user.userName, fullName: user.fullName },
      config.jwtSecret
    )
  );
};

exports.newUser = async (req, res) => {
  let { username, password, fullname } = req.body;
  password = bcrypt.hashSync(password, 8);
  console.log(password);
  if (!(username && password && fullname)) {
    res.status(400).send();
  }
  try {
    await knex("users").insert({ username, password, fullname });
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};
