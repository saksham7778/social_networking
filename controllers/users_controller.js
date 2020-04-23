const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:'Codeial|Profile'
    });
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
        // req.flash('error','Passowrds Do not match!');
        console.log('error Passowrds Do not match!')
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            // req.flash('error',err);
            console.log('error in finding user in signing up'); 
            return res.redirect('back');
        }

        if (!user){
            User.create(req.body, function(err, user){

                if(err){
                    // req.flash('error',err);
                    console.log('error in finding user in signing up'); 
                    return res.redirect('back');
                }

                // req.flash('success','User Signed Up!');
                console.log('User Signed Up!');                
                return res.redirect('/users/sign-in');
            })
        }else{
            // req.flash('error','User already exists!');
            console.log('User already exists!');
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
    console.log('success ! You have Logged IN');
    return res.redirect('/users/profile');
}