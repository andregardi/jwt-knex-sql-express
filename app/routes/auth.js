var express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const checkJwt = require("../midlewares/checkJwt").checkJwt;
const checkRole = require("../midlewares/checkRole").checkRole;

router.post("/login", controller.login);
router.post("/user", [checkJwt, checkRole("ADMIN")], controller.newUser);

module.exports = router;
