const config = require("../config/config");
const knex = require("../knex/knex");

exports.checkRole = role => {
  return async (req, res, next) => {
    const userId = req.jwtPayload.user.id;
    try {
      const row = await knex("roles")
        .where({ userId, role })
        .first();
      if (row) {
        next();
      } else {
        res.status(401).send();
      }
    } catch (error) {
      res.status(500).send();
    }
  };
};
