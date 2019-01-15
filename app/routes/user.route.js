var express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const checkJwt = require("../helpers/checkJwt").checkJwt;
const checkRole = require("../helpers/checkRole").checkRole;

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], controller.listAll);

//Get one user
router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], controller.getOne);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], controller.newUser);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  controller.removeUser
);

//Edit one user
router.post(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  controller.editUser
);

module.exports = router;
