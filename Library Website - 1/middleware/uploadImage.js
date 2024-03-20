// middleware to upload images to the storage

const mutler = require("multer"); // files manager
const path = require("path");

let storage = mutler.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); // where the file with be stored
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // what the file will be named in the database
    }
});

let upload = mutler ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg"
        ) {
            callback(null, true);
        } else {
            console.log("only jpg and png files supported!");
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

module.exports = upload;