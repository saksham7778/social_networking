const Post =  require('../models/posts');

module.exports.home = function(req,res){
    
    //// populate the user of each post
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments', //from models/post.js
        populate:{
            path:'user'
        }
    })  
    .exec(function(err,posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:posts,
        });
    });
} 