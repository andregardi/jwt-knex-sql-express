const jwt = require("jsonwebtoken");

const config = require("../config/config");

exports.checkJwt = (req, res, next) => {
  const token = req.headers["auth"];
  // req.jwtPayload = 3;
  try {
    req.jwtPayload = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    res.status(401).send();
  }
  next();
};
