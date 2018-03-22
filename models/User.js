const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    images: []
})

//generate secure password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

//check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', function(next) {                                         //Before saving, run this function which checks if password is modified
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password)
    }
    next()
})

const User = mongoose.model("User", userSchema)
module.exports = User

