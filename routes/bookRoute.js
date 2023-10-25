const express = require("express");

const Book = require("../models/bookModal");

const route = express.Router();

//route for save new books

route.post("/", async (req, res) => {
  try {
    // check if any of the fileds is empty
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please send all the required fields",
      });
    }

    // creating a new book obj

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    //sending the response

    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to get all books  from Database

route.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    return res.status(200).json({
      count: allBooks.length,
      data: allBooks,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// Route to get books from Database By Id

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//Route to update book

route.put("/:id", async (req, res) => {
  try {
    // check if any of the fileds is empty
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please send all the required fields",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      return res.status(200).json({ message: "Book updated successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//Route to delete a book

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      return res.status(200).json({ message: "Book deleted successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

module.exports = route;
