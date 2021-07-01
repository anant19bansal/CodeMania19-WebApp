const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);
        // console.log(req.body);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user:req.user._id,
                post:req.body.post,
            });
            
            // updating in db for first time
            await post.comments.push(comment);    //automatically pushes the comment id
            await post.save();  // should be called after updating because it is in RAM for now

            await comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);
            // let job = queue.create('emails', comment).save(function(err){
            //     if(err) {console.log('error in sending to the queue ', err); return;}

            //     console.log('job enqueued ', job.id);
            // })
            console.log(comment);
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:{
                            content: comment.content,
                            Id: comment._id,
                            postId: comment.post,
                            name:comment.user.name
                        }
                    }
                });
            }

            req.flash('success', "You commented on the post");
            return res.redirect('/');
        }

    } catch (error) {
        req.flash('error', error);
        return res.redirect('/');
        // console.log('Error increating comment...in comments_controller .create, ', error);
        // return;
    } 
};


module.exports.destroy = async function(req, res){
    
    try {
        
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            let del = await Like.deleteMany({onModel:'Comment', likeable:comment._id})
            comment.remove();

            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id: comment._id
                    }
                });
            }

            req.flash('success', "You removed the comment");
            return res.redirect('back');
        }else{
            req.flash('success', "You cannot remove this comment");
            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
        // console.log("Error in deletein comment ... in comments_controller, ", error);
        // return;
    }
    
};

// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();

//             Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
    
    
    // another way to destroy...it was working fine :) just remember to do .save() after updation
    // used query params instead of params 

    // let postId = req.query.postId;
    // let commentId = req.query.commentId;

    // Comment.findById(commentId, function(err, comment){
    //     // console.log(comment);
    //     if(comment.user == req.user.id){
    //         comment.remove();
    //         Post.findById(postId, function(err, post){
    //             // console.log(post);
    //             let deleteIndex = post.comments.findIndex(id => id==commentId);
    //             // console.log(deleteIndex);
    //             if(deleteIndex!=-1){
    //                 post.comments.splice(deleteIndex,1);
    //                 post.save();
    //             }
    //             return res.redirect('back');
    //         });
    //     }else{
    //         console.log('user nahi hai sahi');
    //         return res.redirect('back');
    //     }
    // });
// }