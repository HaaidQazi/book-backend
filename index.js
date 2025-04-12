const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


app.use(express.static('public'));


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
