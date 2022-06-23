const express = require("express");
const router = express.Router();
// import controller
const {
  bookCreate,
  getOneBook,
  findAllBook,
  deleteBook,
  updateBookdetails
} = require("../controllers/books");

router.post(
    "/bookCreate",
    bookCreate
  );
  router.post(
    "/getOneBook",
    getOneBook
  );
  router.get(
    "/findAllBook",
    findAllBook
  );
  router.delete(
    "/deleteBook",
    deleteBook
  );
  router.put(
    "/updateBookdetails",
    updateBookdetails
  );
  module.exports = router;