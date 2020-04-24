const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){

Post.findById(req.body.post,function(err,post){ //in req.body.post (post is the name of input in home.ejs in the form)

    if(post){
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        },function(err,comment){
            // handle error
            if(err) {
                console.log("error in creating comment");
            }

            // adding comment to post
            post.comments.push(comment); ///push() ->given by mongoDb    ,comments from model/post.js
            post.save();

            return res.redirect('/');
        });
    }
});
}


module.exports.destroy = async function(req, res){

    Comment.findById(req.params.id,function(err,comment){ 
        if(comment.user == req.user.id ){

            let postId=comment.post;
            comment.remove();
            console.log('comment deleted');
            Post.findByIdAndUpdate(postId , { $pull:{ comments: req.params.id }} , function(err,post){
                return res.redirect('back');
            })
        }else{
            console.log('you can not delete this comment');
            return res.redirect('back');
        }
    });
} 
