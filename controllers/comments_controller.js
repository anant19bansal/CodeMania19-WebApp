const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                user:req.user._id,
                post:req.body.post,
            },function(err, comment){
                if(err){console.log('error in creating a comment in db'); return;}
                // updating in db for first time
                post.comments.push(comment);    //automatically pushes the comment id
                post.save();  // should be called after updating because it is in RAM for now
                return res.redirect('/');
            });
        }
    });
    
    
    
}