// to add multiple items at once

require("dotenv").config();

const connectDB = require("./src/db/connect");

const Book = require("./src/models/Book");

const jsonBooks = require("./books.json");

// and we just connect with the database

const start = async () => {
    try {
        await connectDB();
        await Book.deleteMany(); // to reset all books from database
        await Book.create(jsonBooks); // to add books from list to the database 
        process.exit(0); // to exit process
    } catch (error) {
        console.log(error); 
        process.exit(1); 
    }
}

start(); // some notes are based on Fazt Code's