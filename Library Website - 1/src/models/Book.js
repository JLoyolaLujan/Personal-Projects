const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    available: Boolean
}, 
{   timestamps: true,
    versionKey: false,
    collection: "books"});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;