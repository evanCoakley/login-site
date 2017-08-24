const express = require("express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const logger = require("morgan");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const indexRoutes = require("./routes/indexRoutes");
const users = require("./data");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const checkAuth = require("./middlewares/checkAuth");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;

//Templating Engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));


//Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", checkAuth, userRoutes);



app.listen(port, () => {
    console.log(`Running on port ${port}!`);
});