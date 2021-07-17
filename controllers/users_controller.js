const User = require('../models/user');
const fs = require('fs');
const path = require('path');
// module.exports.profile = function(req, res){
//     return res.render('user_profile',{
//         title: "user profile"
//     });
// };

module.exports.profile = function(req, res){
    User.findById(req.params.id).populate({path: 'friendships'}).exec(function(err, user){
        // console.log(user);
        return res.render('user_profile',{
            title: "user profile",
            profile_user: user
        });
    })
};

// module.exports.update = async function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, {name:req.body.name, email:req.body.email}, function(err, user){
//             req.flash('success', "Your profile is updated");
//             return res.redirect('back');
//         });
//     }else{
//         req.flash('error', "You cannot update this profile");
//         return res.status(401).send('Unauthorized');
//     }
// };

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {console.log('**** Multer Error: ', err); return;}
                // console.log(req.file);
                // console.log(req.body);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // saving path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (err) {
            req.flash('err', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', "You cannot update this profile picture");
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up" 
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', "Your passwords didn't match");
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user){
            let user = await User.create(req.body);
            req.flash('success', "You signed up successfully");
            return res.redirect('/users/sign-in');
        }else{
            req.flash('error', "This email id is already in use");
            return res.redirect('back');
        }    
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
        // console.log("Error in creating user ... in users_controller .create ", error);
        // return;
    }
};

// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return;}
//         if(!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user in signing up'); return;};
//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })
// };

// sign in and create a session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    
    req.logout();   // function given to req by passport
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}
