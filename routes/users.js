const express = require("express")
const usersRouter = new express.Router()
const passport = require("passport")


usersRouter.get("/login", (req, res) => {
    res.render("login", {message:req.flash("loginMessage")})
})

usersRouter.post("/login", (passport.authenticate("local-login", {          
    successRedirect: "/profile",
    failureRedirect: "/login"
})))

usersRouter.get("/signup", (req, res) => {
    res.render("signup", {message:req.flash("signupMessage")})
})

usersRouter.post("/signup", (passport.authenticate("local-signup", {          
    successRedirect: "/profile",
    failureRedirect: "/signup"
})))

usersRouter.get("/profile",isLoggedIn, (req, res) => {                                                                  // If somebody makes a getmethod on /profile, run the isLoggedIn function first 
    res.render("profile", {user: req.user, message: req.flash("signupMessage")})                                        // req.user = current user. "user" can be anyname - "client", "customer" etc
})

usersRouter.get("/logout", (req, res) => {
    req.logout()                                                                                                        // Passport has inbuilt method logout() - It invalidates the cookie
    res.redirect("/")
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()                                                                             //By implementing passport middleware we're manipulating requests 
    res.redirect("/login")                                                                                         // New session path
}
  
usersRouter.patch("/users/:id" )

//usersRouter.delete()

module.exports = usersRouter