const Comment = require('../models/comments');
const Post = require('../models/posts');
const Like = require('../models/like');


module.exports.create = async function(req, res){

    try {
        
        let post = await Post.findById(req.body.post);
        //in req.body.post (post is the name of input in home.ejs in the form)
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            
            req.flash('success','comment created!');
            // adding comment to post
            post.comments.push(comment); ///push() ->given by mongoDb    ,comments from model/post.js
            post.save();
            return res.redirect('/');
        }

    } catch (error) {
        req.flash('error', 'Error in comment_controller-create : ');
        // console.log('Error in comment_controller-create : ' , error);
        return res.redirect('back');

    }
    
}

module.exports.destroy = async function(req, res){

    let comment =await  Comment.findById(req.params.id); 
    let post_help =await Post.findById(comment.post);
    console.log("22222222222222222222222222222222222",req.user.id);
    console.log("33333333333333333333333333333333333",post_help.user);
    if(comment.user == req.user.id || post_help.user == req.user.id ){

        let postId=comment.post;

        // CHANGE :: destroy the associated likes for this comment
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

        comment.remove();
        req.flash('success','comment deleted');
        // console.log('comment deleted');
        await Post.findByIdAndUpdate(postId , { $pull:{ comments: req.params.id }} , function(err,post){
        return res.redirect('back');
        })
    }else{
        req.flash('error','you can not delete this comment');
        // console.log('you can not delete this comment');
        return res.redirect('back');
    } 
} 
