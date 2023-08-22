const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log("file--->>", file)
      cb(null, file.originalname );
    },
});
const upload = multer({ storage: storage });
console.log("upload--->>", upload)
module.exports = { upload }