const User = require('../models/user');
const fs= require('fs');   //file system
const path = require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('profile',{
            title:'Codeial|Profile',
            new_user:user,
        });
    })
}

module.exports.sign_up = function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        title:'Codeial|SignUp'
    });
}

// get the sign up data
module.exports.create = function(req, res){

    if (req.body.password != req.body.confirm_password){
        req.flash('error','Passowrds Do not match!');
        // console.log('error Passowrds Do not match!')
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error','error in finding user in signing up');
            // console.log('error in finding user in signing up'); 
            return res.redirect('back');
        }

        if (!user){
                User.create({
                    email: req.body.email,
                    password:req.body.password,
                    name:req.body.name
                }, function(err, user){
    
                if(err){
                    req.flash('error',err);
                    // console.log('error in finding user in signing up'); 
                    return res.redirect('back');
                }

                req.flash('success','User Signed Up!');
                // console.log('User Signed Up!');                
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error','User already exists!');
            // console.log('User already exists!');
            return res.redirect('back');
        }
    });
}


// #########################################################################################################################33
module.exports.sign_in = function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    
    return res.render('user_sign_in',{
        title:'Codeial|SignIn'
    });
}

module.exports.createSession = function(req,res){
    req.flash('success','You have Logged IN');
    // console.log('success ! You have Logged IN');
    return res.redirect('/');
}


module.exports.sign_out = function(req, res){
    req.logout();
    req.flash('success','You have Logged Out');
    // console.log('success ! You have Logged Out');
    return res.redirect('/');
} 

module.exports.update = async function(req, res){

    if(req.user.id== req.params.id){
        try {
       
            let user = await User.findById(req.params.id);
            await User.uploadedAvatar(req,res,function(err){
                if(err) { console.log('******************Multer error',err)};

                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){

                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
                    }
                    //this is saving the path of the uplaoded file into the avatar field in user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }

                user.save();
                req.flash('success','Accout updated');

                return res.redirect('back');
            });

        }catch(error) {
            req.flash('error',error);
            return res.redirect('back');       
        }
    }
    else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorised');
    }
} 	