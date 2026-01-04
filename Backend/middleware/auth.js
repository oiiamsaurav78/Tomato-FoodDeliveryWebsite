import jwt from "jsonwebtoken";

const authMiddleware=async(req,res,next)=>{
    // const {token}=req.header.token;
    const token = req.headers.token;

    
    if(!token){
        return res.json({
            success:false,message:"Not Authorized Login Again -token"
        });
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userID=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error",
        }) 
    }

}

export default authMiddleware;
// connect it with cartRoute