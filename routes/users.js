const express = require("express")
const usersRouter = new express.Router()
const passport = require("passport")
const User = require('../models/User.js')

usersRouter.get("/login", (req, res) => {
    res.render("login", {message:req.flash("loginMessage")})
})

usersRouter.post("/login", (passport.authenticate("local-login", {          
    successRedirect: "/users/profile",
    failureRedirect: "/users/login"
})))

usersRouter.get("/signup", (req, res) => {
    res.render("signup", {message:req.flash("signupMessage")})
})

usersRouter.post("/signup", (passport.authenticate("local-signup", {          
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup"
})))

usersRouter.get("/profile",isLoggedIn, (req, res) => {                                                                  // If somebody makes a getmethod on /profile, run the isLoggedIn function first 
    res.render("profile", {user: req.user, User: User, message: req.flash("signupMessage")})                                        // req.user = current user. "user" can be anyname - "client", "customer" etc
})

usersRouter.get("/logout", (req, res) => {
    req.logout()                                                                                                        // Passport has inbuilt method logout() - It invalidates the cookie
    res.redirect("/")
})

usersRouter.get("/edit", isLoggedIn, (req, res) => {
    res.render("edit", {user: req.user})
 })
usersRouter.patch("/profile", isLoggedIn, (req, res) => {
    res.render("profile", {user: req.user})
 })

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()                                                                             //By implementing passport middleware we're manipulating requests 
    req.flash("loginMessage", "Are you logged in?")
    res.redirect("/users/login")                                                                                         // New session path
}
  


//usersRouter.delete()

module.exports = usersRouter