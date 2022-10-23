const express = require("express")
const User = require("../models/user")
const Cart = require("../models/cart")

const router = express.Router()

router.get("/cart", (req, res, next) => {
  res.render("orders", { pageTitle: "Cart", path: "/cart"})
})

module.exports = router
