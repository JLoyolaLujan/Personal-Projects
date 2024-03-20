const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    birthdate: String,
    tel: Number,
    website: String,
    genre: Array,
    favourite1: String,
    favourite2: String,
    favourite3: String,
    favourite4: String,
    favourite5: String,
    photo: {
        type: String
    },
    bio: String
}, {
    timestamps: true,
    versionKey: false,
    collection: "users"
});

// no encryption needed for now

const User = mongoose.model("User", userSchema);

module.exports = User;