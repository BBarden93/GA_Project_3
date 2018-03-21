// // //WEATHER API

// const axios = require("axios")
// const httpClient = axios.create()
// const Image = require("../models/Image.js")
// var $cityTemperature = $("#city-temperature")
// var $cityHumidity = $("#city-humidity")
// var $weatherIcon = $("#weather-icon")

// const location = Image.location
// const options = {url: `/weather/${location}`}                   
//     httpClient(options).then((apiResponse) => {          
//         console.log(apiResponse.data)                    
//         // $cityName.text(apiResponse.data.name)
//         const icon = apiResponse.data.weather[0].icon
//         const temp = apiResponse.data.main.temp
//         const hum = apiResponse.data.main.humidity
//         $weatherIcon.attr("src", `http://openweathermap.org/img/w/${icon}.png`)
//         $cityTemperature.text(temp)        
//         $cityHumidity.text(hum)
//     })
