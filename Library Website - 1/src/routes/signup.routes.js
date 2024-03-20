const express = require("express");
const userRouter = express.Router();

const User = require("../models/User");

const upload = require("../../middleware/uploadImage");

let path = require("path");
userRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../../public/index.html"));
});


userRouter.post("/", upload.single("photo"), async (req, res) => {
    try {
        // const newUser = new User(req.body); 
        // const { name, email, password, role } = req.body;

        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            birthdate: req.body.birthdate,
            tel: req.body.tel,
            website: req.body.website,
            bio: req.body.bio,
            role: req.body.role,
            genre: [
                "drama: " + req.body.favourite1,
                "horror: " + req.body.favourite2,
                "nonfiction: " + req.body.favourite3,
                "comedy: " + req.body.favourite4, 
                "satire: " + req.body.favourite5
            ],
        });

        if(req.file) {
            newUser.photo = req.file.path;
            // console.log(req.file.path);
        }
        
        
        if (!req.body.password) return res.status(400).json({ message: "No password has been sent" });
        
        if (!req.body.role) newUser.role = "user";
        /*
        const checkUser = await User.findOne({username: req.body.username});
        
        if (checkUser) return res.status(400).json({ message: "Username already in use, try another" });
        */
        const checkEmail = await User.findOne({email: req.body.email}); 

        if (checkEmail) return res.status(400).json({ message: "Email already used, try another"});
        

        await newUser.save();
        // res.status(201).json(newUser);
        // console.log(newUser.role);
        res.redirect("/api/signin");
        
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

module.exports = userRouter;