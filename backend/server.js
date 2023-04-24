require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests on port 4000
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to MongoDB and Listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => console.log(err));
