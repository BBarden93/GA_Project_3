const User = require("../models/User")

module.exports = {                                                                                  // The only place we use model is in controller
    // index: (req, res) => {
       
    // },
    show: (req, res) => {
        User.findById(req.params.id, (err, thatUser) => {
            if(err) return console.log(err)
            res.render("users/show", {user: thatUser})
        })                          
    },
    new: (req, res) => {
            res.render("users/new")
    }, 
    create: (req, res) => {
        User.create(req.body, (err, newUser) =>{
            if(err) return console.log(err)
            res.render("users/profile", {user: newUser})
        })
    }, 
    edit: (req, res) => {
        User.findById(req.params.id, (err, thatUser) =>{  
            if(err) return console.log(err)
            res.render("users/edit", {user: thatUser})
        })                    
    }, 

    update: (req, res) => {
         User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {                     // Find the user by the id and update the body(two arguments)
            if(err) return console.log(err)
            res.render("users/", {user: updatedUser}) 
         })                                                                                        
    }, 

    destroy: (req, res) => {    
         User.findByIdAndRemove(req.params.id, (err) => {
             res.redirect("/")
         })
    }
}