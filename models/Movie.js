const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    genre: String,
    duration: Number,
    showtimes: [String],
    date: String,
    availableSeats: Number
});

module.exports = mongoose.model("Movie", movieSchema);