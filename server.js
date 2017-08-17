const express = require("express");
const path = require("path");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const logger = require("morgan");
const app = express();
const port = process.env.PORT || 8000;
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

//Templating Engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.get("/", (req, res) => {
    console.log(req.session);
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});








app.listen(port, () => {
    console.log(`Running on port ${port}!`);
});