const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String
})

const Image = mongoose.Model('Images', imageSchema)
module.exports = Image
