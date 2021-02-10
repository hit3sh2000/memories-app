const express=require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator')
const UserModel = require('../models/usermodel');
const ImgModel = require('../models/imagemodel');
const auth = require('../middlewares/auth');

router.get('/',async(req,res)=>{
    try {
        const images = await ImgModel.find().sort({ _id: -1 })
        res.json(images);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error")
    }
})
router.post('/',[auth,
    check('url', 'url is required').isURL(),
    check('title', 'Title is requires').not().isEmpty()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {url,title} =req.body;
    try {
        const newImg=new ImgModel({
             url,
             title
        })
      const savedImg= await newImg.save();
      res.json(savedImg);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error")
    }

})
module.exports = router;