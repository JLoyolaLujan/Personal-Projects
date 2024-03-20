const express = require("express");
const userRouter2 = express.Router();

const User = require("../models/User");

// admin here is able to check/ delete / change user information

// get all users

userRouter2.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// get a certain user

userRouter2.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// change the information of a user

userRouter2.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// delete user 

userRouter2.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); 
        res.json({ message: "User has been succesfully deleted" });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

module.exports = userRouter2;