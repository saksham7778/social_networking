const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // you can see it from robo3t
        ref:'User'
    },

    // include array of ids of all comments in this postSchema itself to make comments access fast
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
}, {
    timestamps: true
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;