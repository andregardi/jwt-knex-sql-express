var express = require("express");
const helmet = require("helmet");
var bodyParser = require("body-parser");

const index = require("./routes/");

const knex = require('knex');

console.log(knex);

var app = express();
app.use(bodyParser.json());
app.use(helmet());

app.use("/", index);

app.listen(3000, function() {
  console.log("Server running on port 3000!");
});
