const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function(req, res){
    
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        return res.redirect('back');    
    } catch (err) {
        console.log("Error in creating post in posts_controller .create ",err);
        return;
    }
};


// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id,
//     },function(err, post){
//         if(err){console.log('error in creating post'); return;}
//         return res.redirect('back');
//     });
// };


module.exports.destroy = async function(req, res){
    try {
        
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){   // .id means converting the object id (_id) into string
            post.remove();
            // .deleteMany() deletes all the comments based on the query passed
            let comment = await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    } catch (error) {
        console.log("Error in deleteing post....posts_controller .destroy", error);
        return;
    }
};



// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err,post){
//         if(post.user == req.user.id){   // .id means converting the object id (_id) into string
//             post.remove();

//             // .deleteMany() deletes all the comments based on the query passed
//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }