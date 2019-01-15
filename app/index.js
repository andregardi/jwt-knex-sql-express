var express = require("express");
const helmet = require("helmet");
var bodyParser = require("body-parser");

const index = require("./routes/");

var app = express();
app.use(bodyParser.json());
app.use(helmet());

app.use("/", index);

app.listen(3000, function() {
  console.log("Server started on port 3000!");
});
