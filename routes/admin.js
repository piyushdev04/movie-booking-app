const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const Movie = require("../models/Movie");

// create movie
router.post("/movies", verifyToken, isAdmin, async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ error: "Could not create movie" });
    }
});

// update movie
router.put("/movies/:id", verifyToken, isAdmin, async (req, res) =>  {
    try {
        const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Could not update movie" });
    }
});

// delete movie
router.delete("/movies/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete movie" });
    }
});

// list all movies 
router.get("/movies", verifyToken, isAdmin, async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

module.exports = router;