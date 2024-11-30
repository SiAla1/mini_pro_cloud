const express = require('express'); 
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const app = express();
const clientRoutes = require('./routes/clientRoutes');

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for CORS
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api', clientRoutes);

// Fallback to React's index.html for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Logger middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Start the server
const PORT = process.env.PORT || 5000; // Utiliser la constante PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
