const express = require("express");
let dotenv = require("dotenv").config();
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/checkAuth");

var auth = require("./routes/auth");
var user = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", auth);
app.use("/", checkAuth, user);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
