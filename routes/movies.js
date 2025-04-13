const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Get all movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err) {
        console.error("Error fetching movies:", err);
        res.status(500).json({ message: "Failed to fetch movies" });
    }
});

// Get movie by ID
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.json(movie);
    } catch (err) {
        console.error("Error fetching movie:", err);
        res.status(500).json({ message: "Failed to fetch movie" });
    }
});

module.exports = router;