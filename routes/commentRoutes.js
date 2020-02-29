const express = require('express');
const commentModel = require('../models/comments');
const app = express();

app.get('/', async (req, res) => {
    try {
        res.send("main page");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/comments', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  const comments = await commentModel.find({});
  console.log("WE R HERE NOW");
  try {
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/comment', async (req, res) => {
    const comment = new commentModel(req.body);
  
    try {
      await comment.save();
      res.send(comment);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = app