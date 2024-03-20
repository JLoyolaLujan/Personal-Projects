// school library 

// (studients sign up - sign in to get books)
// (administration sign up - sign in to add / substract books)
// (administration also have to power to delete created profiles)

// we import express 
const express = require("express"); 
const app = express(); // we call/use express

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json()); // to send requrests in json format

// .env
require("dotenv").config();

// DB
const connectDB = require("./src/db/connect");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// import routes
const booksRouter = require("./src/routes/books.routes");
app.use("/api/books", booksRouter);

const signUpRouter = require("./src/routes/signup.routes");
app.use("/api/signup", signUpRouter);

const userManager = require("./src/routes/admin.check");
app.use("/api/usermanager", userManager);

const signInRouter = require("./src/routes/signin.routes");
app.use("/api/signin", signInRouter);

const PORT_ = process.env.PORT || 3000; 

// to listen 
const start = async () => {
    try {
        await connectDB(); // if database is up
        // then we'll start the server
        app.listen(PORT_, () => {
            console.log(`Server listening at http://localhost:${PORT_}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();