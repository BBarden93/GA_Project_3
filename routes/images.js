const express = require("express")
const imagesRouter = new express.Router()
const passport = require("passport")
const imagesCtrl = require("../controllers/images_controller.js")
const Image = require("../models/Image.js")
const User = require("../models/User.js")

imagesRouter.get("/", imagesCtrl.index)
imagesRouter.get("/new", isLoggedIn, imagesCtrl.new)
imagesRouter.post("/new", isLoggedIn, imagesCtrl.create)
imagesRouter.get("/:id", imagesCtrl.show)
imagesRouter.get("/:id/edit", isLoggedIn, imagesCtrl.edit)
imagesRouter.patch("/:id", isLoggedIn, imagesCtrl.update)
imagesRouter.delete("/:id/delete", isLoggedIn, imagesCtrl.destroy)
imagesRouter.post("/:id/add", isLoggedIn, (req, res) => {
    Image.findById(req.params.id, (err, thatImage) => {  
        req.user.images.push(thatImage)
        req.user.save((err) => {
            res.redirect('/users/profile')
        })
    })
})

module.exports = imagesRouter

//Users can edit and create only if logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()                                                                             //By implementing passport middleware we're manipulating requests 
    req.flash("loginMessage", "Are you logged in?")
    res.redirect("/users/login")                                                                                         // New session path
}