const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});


const indexRoutes = require('./routes/indexRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use('/api', indexRoutes);

app.use(errorMiddleware);





module.exports = app;
