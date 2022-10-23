const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const morgan = require("morgan")
const createError = require("http-errors")
/* const bodyParser = require("body-parser") */

dotenv.config({ path: "config.env" })

const connectDb = require("./utils/database")

const authRoute = require("./routes/auth")
const ShopRouter = require("./routes/shop")
const MainRouter = require("./routes/main")
const OrderRouter = require("./routes/cart")

const PORT = process.env.PORT || 8000

const app = express()

//For Form Data
app.use(express.urlencoded({ extended: true }))

//For JSON Data
app.use(express.json())

app.use(morgan("dev"))

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static(path.join(__dirname, "public")))

app.use(authRoute)
app.use(MainRouter)
app.use(ShopRouter)
app.use(OrderRouter)

app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"))
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  })
})

connectDb()
  .then(console.log(`MongoDB connected`))
  .then(
    app.listen(PORT, () => {
      console.log(`Listening to server on port ${PORT}`)
    })
  )
  .catch((err) => {
    console.log(err)
  })
