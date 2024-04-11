const CustomErrorHandler = require('../customErrorHandler/CustomErrorHandler');
const JwtService = require('../jsonWebTokenService/JwtService');
const auth = async(req,res,next)=>{
    let authHeader = req.headers.authorization;
    if(!authHeader){
        return next(CustomErrorHandler.notAuthorized("Not Authorized!"));
    }
    const token = authHeader.split(' ')[1];
    try {
        const { _id, role } = await JwtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();
    } catch (error) {
        return next(CustomErrorHandler.notAuthorized("Not Authorized!"));
    }
}

module.exports = auth;