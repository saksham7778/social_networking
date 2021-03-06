const Post =  require('../models/posts');
const User =  require('../models/user');

module.exports.home = async function(req,res){
    
    try {
        //// populate the user of each post
        let posts =await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate(
        {
            path:'comments', //from models/post.js    
            populate:{
                path:'user'
            },
            poppulate:{
                path: 'likes'
            }
        })
        .populate('likes');
        
        let users = await User.find({});
        
        return res.render('home', {
            title: "Codeial | Home",
            posts:posts,
            all_users:users,
        });
    } catch (error) {
        console.log('Error in home_ontroller',error);
        return;    
    }

} 