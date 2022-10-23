const mongoose = require("mongoose")

const Schema = mongoose.Schema

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookPublishYear: {
    type: Number,
    required: true,
  },
  bookQuantity: {
    type: Number,
    required: true,
  },
  bookPrice: {
    type: Number,
    required: true,
  },
  bookQualityGrade: {
    type: String,
    required: true,
    max: 3,
    min: 1,
  },
})

const Book = mongoose.model("book", bookSchema)

module.exports = Book
