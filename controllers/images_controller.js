const jsdom = require("jsdom")
const { JSDOM } = jsdom
const { window } = new JSDOM(`<!DOCTYPE html>`)
const $ = require('jQuery')(window);
const Image = require("../models/Image.js")
const axios = require("axios")
const httpClient = axios.create()
require('dotenv').config()
const apiKey = process.env.API_KEY
var $cityTemperature = $("#city-temperature")
var $cityHumidity = $("#city-humidity")
var $weatherIcon = $("#weather-icon")

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
        
            const location = thatImage.location.replace(/\s/g,"")
            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
            const options = {method: "get", url: apiUrl}
            httpClient(options).then((apiResponse) => {
                console.log("temp" + apiResponse.data)                    
                // const icon = apiResponse.data.weather[0].icon
                // const temp = apiResponse.data.main.temp
                // const hum = apiResponse.data.main.humidity
                // $weatherIcon.attr("src", `http://openweathermap.org/img/w/${icon}.png`)
                // $cityTemperature.text(temp)        
                // $cityHumidity.text(hum)
                res.render("show", {image: thatImage, data: apiResponse.data})      
            })            
      
            // .catch((err) => {
            //     console.log(err)
            // }) 
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