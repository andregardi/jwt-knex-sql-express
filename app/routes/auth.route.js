var express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const checkJwt = require("../helpers/checkJwt").checkJwt;

//Login route
router.post("/login", controller.login);

//Change my password
router.post("/change-password", [checkJwt], controller.changePassword);

module.exports = router;
