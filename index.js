const express = require("express")
const app = express()
const mongoose = require("mongoose")
const axios = require("axios")
const ejsLayouts = require("express-ejs-layouts")
const logger = require("morgan")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const passport  = require("passport")
const passportConfig = require('./config/passport.js')
const userRoutes = require('./routes/users.js')
const flash = require('connect-flash')												//Allows us to run a method called req.flash. One time, if refreshed- it goes away
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const usersRouter = require('./routes/users.js')
const PORT = 3000

//MONGOOSE CONNECT
mongoose.connect ("mongodb://localhost/vacation-finder", (err) => {
    console.log(err || "Connected to MongoDB")
})

//STORING SESSIONS INFO
const store = new MongoDBStore({
	uri: "mongodb://localhost/vacation-finder",						//NOT SURE WHAT THIS DOES YET
	collection: 'sessions'
})

//MIDDLEWARE
app.use(logger("dev"))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// EJS CONFIGURATION
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(session({																    //Session is a function that contains options we want to run
	secret: "ur welcome", 															//Make cookies unique to the server that browser doesn't know. Put in .env file. If we change it, it'll log everyone out.
	cookie: {maxAge: 60000000},													    // Cookies (sessions) last for 6000000 ms then logs out
	resave: true,																    // We want to renew the cookie as long as they're using the site.
	saveUninitialized: false,
	store: store																    // Keeps a record of all the people's cookies(sessions info).
}))

//PASSPORT SESSION/INITIALIZATION
app.use(passport.initialize())													    // passport will load all configurations thats setup and use them
app.use(passport.session())													    	// use passport with the options in line 31 when people sign up

app.use((req, res, next) => {
	app.locals.currentUser = req.user 												// currentUser now available in ALL views
	app.locals.loggedIn = !!req.user 												// a boolean loggedIn now available in ALL views
	next()
})

app.get("/", (req, res) => {
    res.render("home")
})

app.use('/users', usersRouter)

app.listen(PORT, (err) => {
	console.log(err || `Server running on ${PORT}`)
})