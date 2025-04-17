require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

try {
    app.use("/api/auth", authRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/movies", movieRoutes);
    app.use("/api/bookings", bookingRoutes);
} catch (err) {
    console.error("Route loading failed:", err);
}

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`)
);