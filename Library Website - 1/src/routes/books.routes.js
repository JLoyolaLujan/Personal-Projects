/*
studients can sign up and sign in

students can get books from the library and give them back, 
this means that the book is not deleted from the database, but 
rather it changes it availability to "false"

<--------------------------------------------------------------->

admins can register the returned books

admins can sign in (one admin profile will be preset)

admins can add more books to the database, delete them, or change
certain information from them

admins can change the permisions from any user (change a profile 
privileges from user to admin or viceversa)

admins can also delete studients from the database
*/

const express = require("express"); 
const bookRouter = express.Router();

const Book = require("../models/Book");

// get all books

bookRouter.get("/", async (req, res) => {
    try {
        const books = await Book.find(); 
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ error: "Something wend wrong, sorry!" });
    }
});

// get book by id

bookRouter.get("/:id", async (req, res) => {
    try {
        // get id through params
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// post book (add new book to the library)

bookRouter.post("/", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// update (to update a book when returned or when needed)
bookRouter.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

bookRouter.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book has been deleted from database" });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

module.exports = bookRouter;