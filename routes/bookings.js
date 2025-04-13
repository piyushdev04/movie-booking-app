const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const Movie = require("../models/Movie");


router.post("/", verifyToken, async (req, res) => {
    const { movieId, seats } = req.body;

    if (!movieId || !seats || seats < 1) {
        return res.status(400).json({ message: "Invalid booking details" });
    }

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        if (movie.availableSeats < seats) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        movie.availableSeats -= seats;
        await movie.save();

        res.status(200).json({ message: "Booking successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Booking failed" });
    }
});

module.exports = router;