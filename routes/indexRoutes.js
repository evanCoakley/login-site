const express = require("express");
const indexRoutes = express.Router();
const checkAuth = require("../middlewares/checkAuth");




indexRoutes.get("/", checkAuth, (req, res) => {
    console.log(req.session);
    res.render("profile", { user: req.session.user });
});





module.exports = indexRoutes;