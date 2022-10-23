const express = require("express")

const shopController = require("../controllers/shop")

const router = express.Router()

router.get("/shop", shopController.getShopPage)

router.get("/add-book", shopController.addBookPage)

router.get("/update-book/:id", shopController.getUpdateBook)

router.post("/add-book", shopController.postAddBookPage)

router.patch("/update-book/:id", shopController.UpdateBook)

router.delete("/delete-book/:id", shopController.postDeleteById)

module.exports = router
