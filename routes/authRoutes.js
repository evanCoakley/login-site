const express = require("express");
const authRoutes = express.Router();
const users = require("../data");




authRoutes.get("/signup", (req, res) => {
    res.render("signup");
});

authRoutes.post("/signup", (req, res) => {
    let newUser = req.body;

    console.log('newUser: ', newUser);
    users.push(newUser);
    console.log('users: ', users);
    res.redirect("/auth/login");



});
authRoutes.get("/login", (req, res) => {
    res.render("login");
});

authRoutes.post("/login", (req, res) => {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    let foundUser = users.find(user => user.username === reqUsername);
    console.log('foundUser: ', foundUser);
    if (!foundUser) {
        return res.render("signup", { errors: ["User Not found"] });
    }

    if (foundUser.password === reqPassword) {
        delete foundUser.password;
        req.session.user = foundUser;
        return res.redirect("/");
    } else {
        return res.render("login", { errors: ["password does not match"] });
    }
});

module.exports = authRoutes;