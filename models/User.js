const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
    role: { type: String, default: "user"},
});

module.exports = mongoose.model("User", userSchema);