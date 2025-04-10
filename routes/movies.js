const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err) {
        console.error("Error fetching movies:", err);
        res.status(500).json({ message: "Failed to fetch movies" });
    }
});

module.exports = router;