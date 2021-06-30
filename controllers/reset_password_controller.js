const User = require('../models/user');
const Reset = require('../models/reset');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const crypto = require('crypto');
const { response } = require('express');

module.exports.enterEmail = function(req, res){
    return res.render('reset-password-email-form',{title:'Reset Password'});
}

module.exports.sendEmail = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err) {console.log('err in finding user-->reset password ', err); return;}

        if(user){
            Reset.create({
                user: user._id,
                token: crypto.randomBytes(20).toString('hex'),
                isValid: true
            },function(err, reset){
                if(err) {console.log('err in creating schema for reset password ', err); return;}
                reset.user = user;
                resetPasswordMailer.newPassword(reset);
                req.flash('success', "Please check your email to reset password");
                return res.redirect('/users/sign-in');    
            });
        }else{
            req.flash('error', "User does not exist");
            return res.redirect('/users/sign-in');
        }
    });
};

module.exports.newPassword = function(req, res){
    console.log(req.params.token);
    Reset.findOne({token: req.params.token}, function(err, reset){
        if(err) {console.log("Error in newPassword controller, ", err); return;}
        console.log(reset);
        if(reset && reset.isValid){
            return res.render('reset-password-form', {title:'Reset Password' ,  reset: reset});
        }else{
            return res.send('<h1>This page does not exist</h1>');
        }
    });
}

module.exports.resetPassword = function(req, res){
    if(req.body.new_password != req.body.confirm_new_password){
        req.flash('error', "Passwords did not match");
        return res.redirect('back');
    }
    Reset.findOne({token: req.params.token}, function(err, reset){
        if(err) {console.log("Error in reset password controller, ", err); return;}
        if(reset && reset.isValid){
            User.findByIdAndUpdate(reset.user, {password: req.body.new_password}, function(err, user){
                if(err) {console.log("Error in updating password of user, ",err); return;}
                reset.isValid = false;
                reset.save();
                // TODO this Reset document can be deleted??
                req.flash('success', "Password updated successfully");
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.send("invalid token");
        }
    });
}