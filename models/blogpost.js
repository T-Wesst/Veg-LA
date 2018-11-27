var mongoose = require('mongoose');
//Schema Setup
var blogpostSchema = new mongoose.Schema({
    title: String,
    price: String,
    image: String,
    body: String,
    createdAt: {type: Date, default: Date.now},
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
