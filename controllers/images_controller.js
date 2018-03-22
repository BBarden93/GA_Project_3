// const jsdom = require("jsdom")
// const { JSDOM } = jsdom
// const { window } = new JSDOM(`<!DOCTYPE html>`)
// const $ = require('jQuery')(window);
const Image = require("../models/Image.js")
const User = require("../models/User.js")
const axios = require("axios")
const httpClient = axios.create()
require('dotenv').config()
const apiKey = process.env.API_KEY
const apiKey2 = process.env.GOOGLE_API
// var $cityTemperature = $("#city-temperature")
// var $cityHumidity = $("#city-humidity")
// var $weatherIcon = $("#weather-icon")

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
            const location = thatImage.location.replace(/\s/g,"%20")
            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
            const options = {method: "get", url: apiUrl}
            // const apiUrl2 =`https://www.google.com/maps/embed/v1/place?key=${apiKey2}&q=${location}`
            // const options2 = {method: "get", url: apiUrl2}            
            httpClient(options).then((apiResponse) => { 
                console.log(apiResponse.data)
                    res.render("show", {image: thatImage, User: User, data: apiResponse.data, location: location, apiKey2: apiKey2})                   
            }).catch((err) => {
                req.flash('errorMessage', 'Could not find country and/or city in weather API')
                res.redirect('/')
            })             
        })                    
    },
    
    new: (req, res) => {
        res.render("newImage")
    }, 
    
    create: (req, res) => {
        Image.create(req.body, (err, newImage) =>{
            console.log("here ")
            console.log(newImage)
            // if(err) return console.log(err)
            
            res.redirect(`/images/${newImage._id}`)
        })
    }, 

    edit: (req, res) => {
        Image.findById(req.params.id, (err, thatImage) =>{  
            if(err) return console.log(err)
            res.render("editImage", {image: thatImage})
        })                
    }, 

    update: (req, res) => {
        console.log("here are the params")
        console.log(req.params)
         Image.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedImage) => {                     // Find the image by the id and update the body(two arguments)
            if(err) return console.log(err)
            res.redirect(`/images/${updatedImage._id}`)            
         })                                                                                        
    }, 

    destroy: (req, res) => {    
         Image.findByIdAndRemove(req.params.id, (err) => {
             res.redirect("/")
         })
    }
}
