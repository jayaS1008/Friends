import jwt from 'jsonwebtoken';

const auth =async(req , res ,next) =>{
    try {
        console.log(req.body);
         const token =req.body.token;
         const isCustomAuth = token.length <500;
         let decodedData;
         if(token && isCustomAuth)
         {
            decodedData=jwt.verify(token ,'secret');
            req.userId = decodedData?.id;
         }else{
             decodedData = jwt.decode(token);
             req.userId =decodedData?.sub;
         }
        return next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;