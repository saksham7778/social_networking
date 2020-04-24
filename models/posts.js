const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/posts/avatars');

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
    ],
    avatar:{
        type:String
    }
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {             //cb is the callback function
      cb(null, path.join(__dirname,'..',AVATAR_PATH));   //models../uploads/users/avatars
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());    //fieldname is avatar in the userSchema
    }
  });

//static
postSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
postSchema.statics.avatarPath = AVATAR_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post;