const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    url: String,
    location: String
})

const Image = mongoose.Model('Images', imageSchema)
module.exports = Image
