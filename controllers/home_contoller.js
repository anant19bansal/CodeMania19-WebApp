const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req, res){
    try {
            
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user',
            },
        });
        let users = await User.find({});

        return res.render('home',{
            title:"Home",
            posts: posts,
            all_users: users,
        });

    } catch (err) {
        console.log("Error: ", err);
        return;
    }
};


// module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('id','25');

    // return res.render('home',{
    //     title:"Home",
    //     all_posts: posts,
    // });


    // return res.end('<h1>Express is up for Codeial! </h1>');


    // Post.find({}, function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });

    // Post.find({}).populate('user').exec(function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });

    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate: {
    //         path:'user',
    //     },
    // })
    // .exec(function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });
    //     Post.find({})
    //     .populate('user')
    //     .populate({
    //         path:'comments',
    //         populate: {
    //             path:'user',
    //         },
    //     })
    //     .exec(function(err, posts){

    //         User.find({}, function(err, users){
    //             if(err){console.log('err in finding the posts'); return;}
    //             return res.render('home',{
    //                 title:"Home",
    //                 posts: posts,
    //                 all_users: users,
    //             });
    //         });
    //     });
// };