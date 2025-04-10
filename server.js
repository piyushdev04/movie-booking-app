require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require("./routes/admin");
const movieRoutes = require("./routes/movies");
const app = express();

connectDB();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/admin", adminRoutes);
app.use("/api/movies", movieRoutes);

app.listen(5000, () => console.log("Server running on port http://localhost:5000/"));