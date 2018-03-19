const mongoose = require('mongoose')
const imagesSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String
})

const Images = mongoose.Model('Images', imagesSchema)
module.exports = Images