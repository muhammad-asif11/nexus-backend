const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
      required: true,
    },
    Lname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'use special character'],
    },
    address: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["investor", "entrepreneur"],
      default: "entrepreneur",
    },

    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }, // user kab bana and kab update hoa
);

module.exports = mongoose.model("User", userSchema);
