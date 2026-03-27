const User = require("../models/User");
const bcrypt = require("bcryptjs"); // if using bcrypt for password hashing

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { Fname, Lname, address, avatar, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found from backend" });
    }

    // Update fields if provided
    if (Fname) user.Fname = Fname;
    if (Lname) user.Lname = Lname;
    if (address) user.address = address;
    if (avatar) user.avatar = avatar;

    // Update password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password; // Remove password from response

    res.json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};