const express = require("express");
const router = express.Router();
const PostMessage = require('../models/postMessage');
const auth =require('../middlewares/auth')
const mongoose=require('mongoose')


router.get("/", async (req, res) => { 
    try {
        const postMessages = await PostMessage.find().sort({createdAt:-1});
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.get("/:id",auth, async (req, res) => { 
  
    try {
        console.log('shcjhasjhvcja');
        const _id =req.user.id
      console.log(_id);
        const data = await PostMessage.find({creator:_id});
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.post("/",auth, async (req, res) => {

    console.log(req.user);

   
    try {
        const post = req.body;
        console.log(post.selectedFile);
        const newPostMessage = new PostMessage({
             ...post,
             name:req.user.name,
              creator: req.user.id,
               createdAt: new Date().toISOString()
             })
     
       const data =await newPostMessage.save();
       console.log(data);

        res.status(201).json(data );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
router.patch("/:id",auth,async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
});
router.delete("/:id",auth, async (req, res) => {
    const { id } = req.params;
     console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
});
router.patch("/:id/likePost",auth,async (req, res) => {
    const { id } = req.params;

    if (!req.user.id) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.user.id));

    if (index === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.user.id));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
});

module.exports = router;
