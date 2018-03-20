const express = require("express")
const imagesRouter = new express.Router()
const passport = require("passport")
const imagesCtrl = require("../controllers/images_controller.js")

imagesRouter.get("/", imagesCtrl.index)
imagesRouter.get("/new", imagesCtrl.new)
imagesRouter.get("/:id", imagesCtrl.show)
imagesRouter.get("/:id", imagesCtrl.edit)

imagesRouter.post("/new", imagesCtrl.create)

imagesRouter.patch("/:id", imagesCtrl.update)
imagesRouter.delete("/:id", imagesCtrl.destroy)

module.exports = imagesRouter

