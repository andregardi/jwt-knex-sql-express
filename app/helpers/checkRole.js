const knex = require("../knex");
const userModel = require("../models/user.model");

exports.checkRole = roles => {
  return async (req, res, next) => {
    //Get the user ID from previous midleware
    const id = req.jwtPayload.id;

    //Get user role from the database
    const user = await knex("users")
      .where({ id })
      .first();
    role = user.role;

    //Check if array of authorized roles includes the user's role
    if (roles.includes(role)) next();
    else res.status(401).send();
  };
};
