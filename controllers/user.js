const express = require("express")
const createError = require("http-errors")

const User = require("../models/user")

const { authSchema } = require("../helpers/authentification_schema")
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_helper")

exports.getLogin = async (req, res, next) => {
  res.render("login", { pageTitle: "Login Page", path: "/login" })
}

exports.postLogin = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body)
    const user = await User.findOne({ email: result.email })

    if (!user) {
      throw createError.NotFound("User not registered")
    }

    const isMatch = await user.isValidPassword(result.password)

    if (!isMatch) {
      throw createError.Unauthorized("Username/Password not valid")
    }

    const accessToken = await signAccessToken(user.id)
    const refreshToken = await signRefreshToken(user.id)

    res.send({ accessToken, refreshToken })
    res.redirect("/shop")
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest("Invalid Username or Password"))
    }
    next(error)
  }
}
