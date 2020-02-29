const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  created: {
      type: Date, default: Date.now
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;