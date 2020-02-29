require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const foodRouter = require('./routes/commentRoutes.js');
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://twoligma:tangerine8@cluster0-agcvh.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(foodRouter);

app.listen(process.env.PORT, () => { console.log('Server is running...') });