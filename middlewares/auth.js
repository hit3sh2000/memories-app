const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function(req,res,next){
    const token=req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:"no token found...."});
    }
    try{
       const decodetoken=jwt.verify(token,config.get('SecretKey'));
       req.user=decodetoken;
       console.log(req.user);
       next();
    }catch{
      res.status(401).json({msg:"Token is invalid"});
    }
}

