## PROJECT 3 - Vacation Finder

This is our first team project using node and express.

![](https://i.imgur.com/TjDyXBG.png)
---
### Project Summary
---
Vacation finder is a crowdsourcing website that allows you to search from a database of images added by other users and add to your bucket list of places to visit. The website also gives you access to add your own destinations. Sign up and start adding your dream vacations!

---
### Technology Used
---
* Node with express
* Various npm packages eg. passport, mongoose and axios
* Javascript
* Bootstrap version 4.0
* Third Party APIs (Google maps & Open weather)
* HTML
* CSS
* MongoDB (Mlab for database storage)
* Heroku cloud platform to deploy the app.

---
### Deployment instructions on local server
---

Clone [this](https://github.com/BBarden93/vacationFinder) repository from Github to a local directory.

##### Configuration: 

* Open directory in terminal.
* Open mongo server.
* Add any necessary packages using ```npm install```and run ```nodemon ``` to start a local server to view app in browser at localhost:3000.

##### Database initialization:

* In your terminal, run code to migrate the app's existing database on mongo. 
This app is now deployed locally.
---
### App architecture
---
This app has utilized the entire CRUD action for atleast 1 model.

We first created a new app using ```rails new the_cookbook --database=postgresql```

Then, we created four models and controllers for them: 

1. Users model with name, email and password and an images array.
2. Images model with location and image url.

We used the app architecture and errors to guide us through to create the entire project. 

We created wireframes using gliphy and iterated through it, which helped us design the site better. 

![ERD](https://i.imgur.com/yLO9Tra.png)

![Wireframes](https://i.imgur.com/OZkDtAl.png)
![Wireframes](https://i.imgur.com/uPFT4Tb.png)

![Wireframes](https://i.imgur.com/IyMqzwW.png)
![Wireframes](https://i.imgur.com/uPFT4Tb.png)


---
### User experience
---
Users should be able to 

* view images.
* link their own location images.
* find the location of the images.
* see current weather of locations.

We worked with [trello](https://trello.com/b/SXCfMAPk/project-3) to set goals and sprints. 

---
### Dream Works
---

* Implement an API for reverse image search
* Redesign pages for mobile users
* AirBnB for locations
* Flight details to locations
