const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        
        let post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user:req.user._id,
                post:req.body.post,
            });
            // updating in db for first time
            post.comments.push(comment);    //automatically pushes the comment id
            post.save();  // should be called after updating because it is in RAM for now
            return res.redirect('/');
        }

    } catch (error) {
        console.log('Error increating comment...in comments_controller .create, ', error);
        return;
    } 
};


module.exports.destroy = async function(req, res){
    
    try {
        
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    } catch (error) {
        console.log("Error in deletein comment ... in comments_controller, ", error);
        return;
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