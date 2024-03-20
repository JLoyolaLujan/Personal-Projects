const express = require("express");
const signInRouter = express.Router();
const User = require("../models/User");

/*
const bodyParser = require("body-parser");
signInRouter.use(bodyParser.urlencoded({extended:true}));
*/

signInRouter.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/signin.html");
});

// check if user exists
signInRouter.post("/", async (req, res) => {

    try {
        const userFound =  await User.findOne({email: req.body.email});

        if (!userFound) {
            return res.status(400).json({ message: "no such user exists" });
        }

        if (req.body.password != userFound.password) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        res.redirect("/api/books");
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, sorry!" });
    }
});

module.exports = signInRouter;