const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Set the port from environment variables or fallback to 8000
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  
app.use('/api/books', bookRoutes); 

// If you want to serve static files from a "public" folder (optional)
app.use(express.static('public'));  // If you have a folder named "public"

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
