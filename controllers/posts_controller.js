const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/user');


module.exports.create = async function(req, res){

    try {
        let post = await Post.create({
            content:11,
            user:req.user._id
        });
        console.log('*****************33',req.body);
        Post.uploadedAvatar(req,res,function(err){
            if(err) { console.log('******************Multer error',err)};

            console.log('*****************11',req.file);
            console.log('*****************22',req.body.content);

            post.content=req.body.content;
            if(req.file){
                post.avatar=Post.avatarPath+'/'+req.file.filename;
            }
            post.save();
        });
        console.log('hello',post);

        req.flash('success','post created!');
        // console.log('success Post created!');
        return res.redirect('back');

    } catch (error) {
        console.log(error);
        req.flash('error',error);
        // console.log('Error in post_controller-create : ' , error);
        return res.redirect('back');

    }
        
}

module.exports.destroy = async function(req, res){  
    
    try {
        
        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string (req.user.id=> req.user._id) 
        if(post.user == req.user.id){ // if the logged in user is same as the posted user or not 
            post.remove();
            req.flash('success','post and associated comments deleted');
            await Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }
        else{
            req.flash('error','you can not delete this post');
            // console.log('you can not delete this post');
            return res.redirect('back');
        }

    } catch (error) {
        
         req.flash('error',error);
        //  console.log('Error in post_controller-destroy : ' , error);
         return res.redirect('back');
         
    }
}