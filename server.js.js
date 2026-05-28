const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getAllJobs } = require('./controllers/jobController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/v1/jobs', getAllJobs);

// Base Health Check
app.get('/', (req, res) => {
  res.send('Job Portal API is running');
});

// Database Connection & Server Init
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Mock DB connection for safety - replace with actual Mongo URI in production
    console.log('Connecting to MongoDB architecture...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();