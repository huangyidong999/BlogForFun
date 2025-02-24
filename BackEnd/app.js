const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./Routes/UserRoutes");
const articlesRoutes = require("./Routes/articleRoutes");
const app = express();
app.use(bodyParser.json());
dotenv.config();


const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/articles',articlesRoutes) //articlesRoutes
// Default route
app.get('/', (req, res) => {
  res.send('Hello, this is the backend!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});