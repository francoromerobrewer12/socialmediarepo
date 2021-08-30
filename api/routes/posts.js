const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//create a post
router.post("/", async (req,res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
});

//update a post
router.put("/:postId", async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(req.body.userId === post.userId){
            await post.updateOne({
                $set: req.body
            })
            res.status(200).json(post);
        } else {
            res.json("You can only update your posts!")
        }
    } catch (err) {
        res.json(err);
    }
});

//delete a post
router.delete("/:postId", async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(req.body.userId === post.userId){
            await post.deleteOne()
            res.status(200).json("Post has been deleted");
        } else {
            res.json("You can only delete your posts!")
        }
    } catch (err) {
        res.json(err);
    }
});

//like and dislike post
router.put("/:postId/like", async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("You like this post!")
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("You dislike this post now!")
        }
    } catch (err) {
        res.json(err);
    }
});

//get a post
router.get("/:postId", async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post)
    } catch (err) {
        res.json(err)
    }
});

//get all posts of the user´s followings
router.get("/timeline/:userId", async (req,res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendsPosts = await Promise.all(
            currentUser.followings.map( (friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendsPosts))
    } catch (err) {
        res.json(err);
    }
});

//get user´s all posts
router.get("/profile/:username", async (req,res) => {
    try{
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id})
        res.status(200).json(posts)
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;