const Book = require("../models/book")

exports.getShopPage = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.render("shop", { pageTitle: "Shop", path: "/shop", books: books })
  } catch (error) {
    console.error(err)
  }
}

exports.addBookPage = (req, res, next) => {
  res.render("add-book", { pageTitle: "Add Book", path: "/add-book" })
}

exports.postAddBookPage = async (req, res, next) => {
  let b_name = req.body.nameOfBook
  let a_name = req.body.a_name
  let b_year = req.body.b_year
  let b_qnt = req.body.b_qnt
  let b_price = req.body.b_price
  let b_quality = req.body.b_quality

  const book = new Book({
    bookName: b_name,
    bookAuthor: a_name,
    bookPublishYear: b_year,
    bookQuantity: b_qnt,
    bookPrice: b_price,
    bookQualityGrade: b_quality,
  })

  try {
    const result = await book.save()
    res.redirect("/shop")
  } catch (error) {
    console.log(error)
  }
}

exports.UpdateBook = async (req, res, next) => {
  const bname = req.body.bookName
  const aname = req.body.bookAuthor
  const byear = req.body.bookPublishYear
  const bqnt = req.body.bookQuantity
  const bprice = req.body.bookPrice
  const bquality = req.body.bookQualityGrade
  const id = req.params.id

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        bookName: bname,
        bookAuthor: aname,
        bookPublishYear: byear,
        bookQuantity: bqnt,
        bookPrice: bprice,
        bookQualityGrade: bquality,
      },
      { new: true }
    )
    res.redirect("/shop")
  } catch (error) {
    console.log(error)
  }
}

exports.getUpdateBook = (req, res, next) => {
  res.render("update-book", { pageTitle: "Update Book", path: "/update-book" })
}

exports.postDeleteById = async (req, res, next) => {
  const id = req.params.id
  try {
    await Book.findByIdAndDelete(id)
    res.redirect("/shop")
  } catch (error) {
    next(error)
  }
}
