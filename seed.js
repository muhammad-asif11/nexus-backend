const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/nexusdb");

const products = [
  {
    title: "HAVIT HV-G92 Gamepad",
    description: "Mouse Game",
    images: "/uploads/Game.png",
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 4.5,
    reviews: 88,
    stock: 10,
  },
  {
    title: "AK-900 Wired Keyboard",
    description: "Computer Keyboard",
    images: "/uploads/keyboard.png",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    stock: 15,
  },
  {
    title: "IPS LCD Gaming Monitor",
    description: "Computer gaming monitor",
    images: "/uploads/chair.png",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 99,
    stock: 20,
  },
  {
    title: "S-Series Comfort Chair",
    description: "comfortable chair",
    images: "/uploads/dragon.png",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 99,
    stock: 10,
  },
  {
    title: "S-Series Comfort Chair",
    description: "Dragon product",
    images: "/uploads/chair.png",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    stock: 25,
  },
  // ======= Without discount =====
  {
    title: "The north coat",
    description: "The nort jacket coat",
    images: "/uploads/jaket.png",
    price: 260,
    oldPrice: 360,
    rating: 4,
    reviews: 65,
    stock: 12,
  },
  {
    title: "Gucci duffle bag",
    description: "savoy medium bag",
    images: "/uploads/Savoy-medium-duffle-bag.png",
    price: 960,
    oldPrice: 1160,
    rating: 4,
    reviews: 65,
    stock: 18,
  },
  {
    title: "RGB liquid CPU Cooler",
    description: "RGB liquid CPU Cooler",
    images: "/uploads/gammaxx.png",
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    reviews: 65,
    stock: 16,
  },
  {
    title: "Small BookSelf",
    description: "small book self",
    images: "/uploads/Table.png",
    price: 360,
    rating: 5,
    reviews: 65,
    stock: 13,
  },
  // ====== Explore Products ======
  {
    title: "Breed Dry Dog Food",
    description: "Breed Dry Dog Food",
    images: "/uploads/Dog-Food.png",
    price: 100,
    rating: 3,
    reviews: 35,
    stock: 18,
  },
  {
    title: "CANON EOS DSLR Camera",
    description: "CANON EOS DSLR Camera",
    images: "/uploads/DSLR-Camera.png",
    price: 360,
    rating: 4,
    reviews: 95,
    stock: 14,
  },
  {
    title: "ASUS FHD Gaming Laptop",
    description: "ASUS FHD Gaming Laptop",
    images: "/uploads/Gaming-Laptop.png",
    price: 700,
    rating: 5,
    reviews: 325,
    stock: 15,
  },
  {
    title: "Curology Product Set",
    description: "Curology Product Set",
    images: "/uploads/curology.png",
    price: 500,
    rating: 4,
    reviews: 145,
    stock: 10,
  },
  {
    title: "Kids Electric Car",
    description: "Kids Electric Car",
    images: {
      black: "/Electric-Toy-Car.png",
      red: "/uploads/Game.png",
    },
    colors: ["black", "red"],
    condition: "New",
    price: 960,
    rating: 5,
    reviews: 65,
    stock: 30,
  },
  {
    title: "Jr. Zoom Soccer Cleats",
    description: "Jr. Zoom Soccer Cleats",
    images: {
      black: "/Zoom-Soccer.png",
      red: "/uploads/Game.png",
    },
    colors: ["black", "red"],
    price: 1160,
    rating: 5,
    reviews: 35,
    stock: 22,
  },
  {
    title: "GP11 Shooter USB Gamepad",
    description: "GP11 Shooter USB Gamepad",
    images: {
      black: "/USB-Gamepad.png",
      red: "/uploads/Game.png",
    },
    colors: ["black", "red"],
    condition: "New",
    price: 660,
    rating: 4.5,
    reviews: 55,
    stock: 24,
  },
  {
    title: "Quilted Satin Jacket",
    description: "Quilted Satin Jacket",
    images: {
      black: "/Quilted-satin-jacket.png",
      red: "/uploads/Game.png",
    },
    colors: ["black", "red"],
    price: 660,
    rating: 4.5,
    reviews: 55,
    stock: 28,
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
