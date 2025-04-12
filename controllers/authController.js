const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "User already exists" });
  
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed });
  
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ message: "Registration failed", error: err.message });
    }
  };  

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
};