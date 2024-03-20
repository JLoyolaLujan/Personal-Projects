const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/postingTest")
.then(() => {
    console.log("DB connection has been successful");
})
.catch((err) => {
    console.log(`DB connection error: ${err}`);
});

const noteSchema = {
    title:String,
    content:String
}

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
}); 

app.post("/", (req, res) => {
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    newNote.save();
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("server is up");
});