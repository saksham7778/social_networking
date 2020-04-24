const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    //coment belong to a user 
    user: {
        type: mongoose.Schema.Types.ObjectId, // you can see it from robo3t
        ref:'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId, // you can see it from robo3t
        ref:'Post'
    },
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;