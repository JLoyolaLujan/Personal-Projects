// import mongoose

const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("DB connection has been successful");
    })
    .catch((err) => {
        console.log(`DB connection error: ${err}`);
    });
}

module.exports = connectDB;