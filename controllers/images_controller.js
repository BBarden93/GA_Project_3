const Image = require("../models/Image.js")

module.exports = {                                                                                  // The only place we use model is in controller
    index: (req, res) => {
        Image.find({}, (err, allImages) =>{
            if(err) return console.log(err)
            res.render("/", {image: allImages})            
        })
    },
    show: (req, res) => {
        Image.findById(req.params.id, (err, thatImage) => {
            if(err) return console.log(err)
            res.render("show", {image: thatImage})
        })                          
    },
    new: (req, res) => {
            res.render("newImage")
    }, 
    
    create: (req, res) => {
        Image.create(req.body, (err, newImage) =>{
            if(err) return console.log(err)
            res.redirect(`/images/${newImage.id}`)
        })
    }, 

    edit: (req, res) => {
        Image.findById(req.params.id, (err, thatImage) =>{  
            if(err) return console.log(err)
            res.render("editImage", {image: thatImage})
        })                    
    }, 

    update: (req, res) => {
         Image.findByIdAndUpdate(req.params.id, req.body, (err, updatedImage) => {                     // Find the image by the id and update the body(two arguments)
            if(err) return console.log(err)
            res.render("show", {image: updatedImage}) 
         })                                                                                        
    }, 

    destroy: (req, res) => {    
         Image.findByIdAndRemove(req.params.id, (err) => {
             res.redirect("/")
         })
    }
}