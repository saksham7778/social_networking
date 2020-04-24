const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = async function(req, res){

    try {
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        console.log("post created");
        return res.redirect('back');

    } catch (error) {
        console.log("error in creating post");
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){  

    try {
        
        let post = Post.findById(req.params.id );

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

    } catch (error) {
        
        console.log('Error in post_controller-destroy : ' , error);
        return res.redirect('back');

    }

}