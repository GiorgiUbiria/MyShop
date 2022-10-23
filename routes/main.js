const express = require("express")
const { verifyAccessToken } = require("../helpers/jwt_helper")

const router = express.Router()

router.get("/", verifyAccessToken, (req, res, next) => {
  res.render("index", { pageTitle: "Starting Page", path: "/" })
})

module.exports = router
