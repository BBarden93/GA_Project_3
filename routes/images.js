const express = require("express")
const imagesRouter = new express.Router()
const passport = require("passport")
const imagesCtrl = require("../controllers/images_controller.js")

imagesRouter.get("/", imagesCtrl.index)
imagesRouter.get("/new", imagesCtrl.new)
imagesRouter.post("/new", imagesCtrl.create)
imagesRouter.get("/:id", imagesCtrl.show)
imagesRouter.get("/:id/edit", imagesCtrl.edit)


imagesRouter.patch("/:id", imagesCtrl.update)
imagesRouter.delete("/:id/delete", imagesCtrl.destroy)

module.exports = imagesRouter

