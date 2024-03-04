const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const signUp = require("../models/signUp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const dotenv = require("dotenv");

dotenv.config();

// Configure body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { name, username, password, address } = req.body;
  try {
    const existingUser = await signUp.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new signUp({
      name,
      username,
      password: hashedPassword,
      address,
    });
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await signUp.find();
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { username, password, name, address } = req.body;
  const userId = req.params.id;
  try {
    const user = await signUp.findByIdAndUpdate(
      userId,
      { username, password, name, address },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err });
  }
});

module.exports = router;
