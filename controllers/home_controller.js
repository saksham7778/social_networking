const Post =  require('../models/posts');
const User =  require('../models/user');
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
        User.find({},function(err,users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:posts,
                all_users:users,
            });
        });
    });
} 