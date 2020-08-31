const User = require('../models/user');
const fs= require('fs');   //file system
const path = require('path');
const { Console } = require('console');

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
module.exports.create = async function(req, res){

    if (req.body.password != req.body.confirm_password){
        req.flash('error','Passowrds Do not match!');
        // console.log('error Passowrds Do not match!')
        return res.redirect('back');
    }

    try{
        let user = await User.findOne({email: req.body.email});
        console.log('00000000000000000000003',user);
        if (!user){
            let newUser=await User.create({
                email: 11,
                password:11,
                name:11,
                avatar:"https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png",
            })
            console.log('00000000000000000000004',newUser);
            User.uploadedAvatar(req,res,function(err){
                if(err) { console.log('******************Multer error',err)};

                console.log('00000000000000000000000000001',req.body);
                console.log('00000000000000000000000000002',req.file);
                newUser.email= req.body.email,
                newUser.password=req.body.password,
                newUser.name=req.body.name

                if(req.file){

                    // if(newUser.avatar){

                    //     fs.unlinkSync(path.join(__dirname , '..' , newUser.avatar));
                    // }
                    //this is saving the path of the uplaoded file into the avatar field in user
                    newUser.avatar=User.avatarPath+'/'+req.file.filename;
                }
                newUser.save();
            });
            req.flash('success','User registered!');
            // console.log('User registered!);
            return res.redirect('/users/sign-in');
        }else{
            req.flash('error','User already exists!');
            // console.log('User already exists!');
            return res.redirect('back');
        }
    } catch (error) {
            req.flash('error',error);
            console.log('Error in post_controller-create : ' , error);
            return res.redirect('back');
        }
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
                        console.log(__dirname);
                        console.log(path.join(__dirname , '..' , user.avatar));
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