const express = require("express");
const dotenv = require("dotenv");
const cardRoutes = require("./routes/cardRoutes"); // Import modular route handlers
const errorHandler = require("./middlewares/errorHandler"); // Import error handling middleware

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // Use a default port if PORT environment variable is not defined
const path = require("path");

app.use(express.json());

// Serve static files from the 'images' directory at the '/tarotdeck' route
app.use("/tarotdeck", express.static("images"));

// Serve static files from the 'public' directory
app.use("/", express.static(path.join(__dirname, 'public')));

// Mount the cardRoutes router
app.use("/cards", cardRoutes);
app.use("/decks", (req, res) => {
  try {
      res.send("Deck routes will be implemented here.");
  }
  catch(error) { 
      throw new Error("Not implemented yet");
    }
}); // Placeholder for future deck routes
// Handle errors using the errorHandler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
