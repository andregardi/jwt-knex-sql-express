const express = require("express");

const router = express.Router();

const auth = require("./auth.route");
const user = require("./user.route");

router.get("/", function(req, res) {
  res.send("Hello World!");
});

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;