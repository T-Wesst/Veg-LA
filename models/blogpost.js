const mongoose = require('mongoose');
//Schema Setup
blogpostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Name cannot be blank',
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Blogpost', blogpostSchema);
