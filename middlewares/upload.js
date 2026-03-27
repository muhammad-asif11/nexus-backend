// Multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
console.log("Multer middleware", storage);
const upload = multer({ storage });
console.log("Multer middleware", upload);

module.exports = upload;