const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Example root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Add at top with other imports
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/blogs', blogRoutes);



module.exports = app;
