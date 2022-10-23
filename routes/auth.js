const express = require("express")
const createError = require("http-errors")

const User = require("../models/user")
const userController = require("../controllers/user")

const { authSchema } = require("../helpers/authentification_schema")
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_helper")

const router = express.Router()

router.get("/register", async (req, res, next) => {
  res.render("register", { pageTitle: "Register Page", path: "/register" })
})

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body)

    const doesExist = await User.findOne({ email: result.email })

    if (doesExist) {
      throw createError.Conflict(`${result.email} is already registered`)
    }

    const user = new User(result)
    const savedUser = await user.save()
    const accessToken = await signAccessToken(savedUser.id)
    const refreshToken = await signRefreshToken(savedUser.id)

    res.send({ accessToken, refreshToken })
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422
    }
    next(error)
  }
})

router.get("/login", userController.getLogin)

router.post("/login", userController.postLogin)

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      throw createError.BadRequest()
    }
    const userId = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(userId)
    const refToken = await signRefreshToken(userId)

    res.send({ accessToken: accessToken, refreshToken: refToken })
  } catch (error) {
    next(error)
  }
})

module.exports = router
