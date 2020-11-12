const express = require('express');
const router = express.Router();

const {addBook,
      getBooks,
      getBookById,
      updateBook,
      deleteBook} = require("../controller/book.controller");

router.post("/", addBook);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook)



module.exports = router;