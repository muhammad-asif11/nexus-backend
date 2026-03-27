// routes/productRoutes.js
const express = require("express");
const upload = require("../middlewares/upload");
const Product = require("../models/Product");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// ✅ Get all products
router.get("/", getAllProducts);

// ✅ Get single product
router.get("/:id", getProductById);

router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const imagePaths = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      images: imagePaths, // ✅ array
    });

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
