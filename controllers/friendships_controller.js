const User = require('../models/user');
const Friendship = require('../models/friendship');
const { response } = require('express');

module.exports.addFriend = async function(req, res){
    try {
        let user = req.user;
        let friend = await User.findById(req.params.id).populate({path: 'friendships'});
        // console.log(friend);
        if(friend){
            let index = friend.friendships.findIndex((f) => ((f.from_user==user.id) || (f.to_user==user.id)));
            // console.log('index ', index);
            if(index==-1){
                let friendship = await Friendship.create({
                    from_user: user._id,
                    to_user: friend._id
                });
                await user.friendships.push(friendship);
                await user.save();
                await friend.friendships.push(friendship);
                await friend.save();
                return res.status(200).json({
                    data:{
                        isFriend: true,
                        friend: friend,
                        message: `${friend.name} is now your friend`
                    }
                });    
            }else{
                return res.status(400).json({
                    data: {
                        message: `friends already`
                    }
                });
            }
        }else{
            return res.status(400).json({
                data: {
                    message: 'this user does not exist'
                }
            });
        }    
    } catch (error) {
        console.log("***********Error in add friend controller********* ", error);
        return res.status(500).json({
            data:{
                message: 'Internal server error',
            }
        });     
    }  
};

module.exports.removeFriend = async function(req,res){
    let user = req.user;
    let friend = await User.findById(req.params.id).populate({path: 'friendships'});
    // console.log(user);
    // console.log(friend);
    let friendship = friend.friendships.find((f) => ((f.from_user==user.id) || (f.to_user==user.id)));
    console.log(friendship);
    user.friendships.pull(friendship._id);
    user.save();
    friend.friendships.pull(friendship);
    friend.save();
    friendship.remove();
    return res.status(200).json({
        data:{
            isFriend : false,
            friend: friend,
            message: `${friend.name} is not your friend anymore`
        }
    });
}