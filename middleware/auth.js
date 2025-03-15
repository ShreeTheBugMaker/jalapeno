import jwt from "jsonwebtoken"


const authMiddleware = async (req,res,next) =>{
       const {token} = req.headers;
       if (!token){
       return res.json({success:false,message:"Not Authorixed Login Again  "})
    }

    try{
        const troken_decode = jwt.verify(token,process.env.jwt_SECRET);
        req.body.userID = troken_decode.id;
        next();
    } catch(Error){
    console.log(error);
    res.json({success:false,message:"error"})
}
}
export default authMiddleware;