const User = require('../models/user');

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

module.exports.update = function(req, res){

    if(req.user.id== req.params.id){
        // User.findByIdAndUpdate(req.params.id , {name:req.body.name ,email:req.body.email} , function(err,user)
        User.findByIdAndUpdate(req.params.id , req.body , function(err,user){
            req.flash('success','Account updated');
            return res.redirect('back');
        });
    }
    else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorised');
    }
} 	