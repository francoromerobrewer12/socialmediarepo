const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');


//update a user
router.put('/:userId', async (req,res) => {
    if(req.body.userId === req.params.userId || req.body.isAdmin) {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.userId,{
                $set: req.body
            });
            res.status(200).json("Account has been updated!")

        } catch (err) {
            res.json(err)
        }
    } else {
        return res.json("You can only update your account")
    }
});

//delete a user
router.delete('/:userId', async (req,res) => {
    if(req.body.userId === req.params.userId || req.body.isAdmin) {
        try{
            await User.deleteOne({_id: req.params.userId});
            res.status(200).json("User has been deleted!")
        } catch (err) {
            res.json(err)
        }
    } else {
        return res.json("You can only delete your account")
    }
});

//get a user
router.get("/", async (req,res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId ? await User.findById(userId) : await User.findOne({ username: username });
        res.status(200).json(user);
    } catch (err) {
        res.json(err)
    }
});

//get friends
router.get("/friends/:userId", async (req,res) => {
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.json(err)
    }
});

//follow a user
router.put("/:userId/follow", async (req,res) => {
    if(req.body.userId !== req.params.userId){
        try{
            const userToFollow = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);
            if(!userToFollow.followers.includes(req.body.userId)){
                await userToFollow.updateOne({ 
                    $push: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({ 
                    $push: {
                        followings: req.params.userId
                    }
                })
                res.status(200).json("User has been followed!")
            } else {
                res.json("You already follow this user!")
            }

        } catch (err) {
            res.json(err)
        }
    } else {
        res.json("You cant follow yourself!")
    }
});

//unfollow a user
router.put("/:userId/unfollow", async (req,res) => {
    if(req.body.userId !== req.params.userId){
        try{
            const userToUnfollow = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);
            if(userToUnfollow.followers.includes(req.body.userId)){
                await userToUnfollow.updateOne({ 
                    $pull: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({ 
                    $pull: {
                        followings: req.params.userId
                    }
                })
                res.status(200).json("User has been unfollowed!")
            } else {
                res.json("You are not following this user!")
            }
        } catch (err) {
            res.json(err)
        }
    } else {
        res.json("You cant unfollow yourself!")
    }
});


router.get("/", (req, res) => {
    res.send("hey its user route!")
})

module.exports = router;