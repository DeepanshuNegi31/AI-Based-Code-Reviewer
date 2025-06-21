const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/ai', aiRoutes);
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

module.exports = app;
