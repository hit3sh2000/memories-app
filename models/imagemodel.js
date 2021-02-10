const mongoose=require('mongoose');

const ImgSchema=mongoose.Schema({
     url:{
         type:String,
         require:true
     },
     title:{
         type:String,
         require:true,
     } 
});

module.exports=mongoose.model('image',ImgSchema);