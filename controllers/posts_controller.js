const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req, res){

    Post.create({
            content:req.body.content,
            user:req.user._id
        },function(err,post){
            if(err) {
                console.log("error in creating post");
            }
        return res.redirect('back');
    });

}

module.exports.destroy = async function(req, res){  

    Post.findById(req.params.id , function(err,post){

        // .id means converting the object id into string (req.user.id=> req.user._id) 
        if(post.user == req.user.id){ // if the logged in user is same as the posted user or not 
            post.remove();
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }
        else{
            console.log('you can not delete this post');
            return res.redirect('back');
        }
    });
}