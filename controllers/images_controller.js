const Image = require("../models/Image.js")

module.exports = {                                                                                  // The only place we use model is in controller
    index: (req, res) => {
        Image.find({}, (req, res) =>{
            if(err) return console.log(err)
            res.render("/", {image: thatimage})            
        })
    },
    show: (req, res) => {
        Image.findById(req.params.id, (err, thatimage) => {
            if(err) return console.log(err)
            res.render("images/show", {image: thatimage})
        })                          
    },
    new: (req, res) => {
            res.render("images/new")
    }, 
    
    create: (req, res) => {
        Image.create(req.body, (err, newimage) =>{
            if(err) return console.log(err)
            res.render("images/show", {image: newimage})
        })
    }, 

    edit: (req, res) => {
        Image.findById(req.params.id, (err, thatimage) =>{  
            if(err) return console.log(err)
            res.render("images/edit", {image: thatimage})
        })                    
    }, 

    update: (req, res) => {
         Image.findByIdAndUpdate(req.params.id, req.body, (err, updatedimage) => {                     // Find the image by the id and update the body(two arguments)
            if(err) return console.log(err)
            res.render("images/", {image: updatedimage}) 
         })                                                                                        
    }, 

    destroy: (req, res) => {    
         Image.findByIdAndRemove(req.params.id, (err) => {
             res.redirect("/")
         })
    }
}