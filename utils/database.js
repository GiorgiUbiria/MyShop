const mongoose = require("mongoose")

const db = async () => {
  try {
    return mongoose.connect(
      process.env.MONGO_URI
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = db
