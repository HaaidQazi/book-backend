// server/index.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);  
app.use('/api', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
