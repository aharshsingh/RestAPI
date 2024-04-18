const Joi = require('joi');
const RefreshToken = require('../../models/refreshToken');
const CustomErrorHandler = require('../../customErrorHandler/CustomErrorHandler');
const JwtService = require('../../jsonWebTokenService/JwtService');
const User = require('../../models/user');

const refreshController ={
    async refresh(req,res,next){
        //validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        });
        //if the entry of the email or password does not match to the given condtitons in the schema then there will be a validation error
        const { error } = refreshSchema.validate(req.body);
        if(error){
            return next(error);
        }
        let userId;
        let refreshToken;
        //checking for refresh_token in database
        try {
            refreshToken = await RefreshToken.findOne({ token: req.body.refresh_token });
            if(!refreshToken){
                return next(CustomErrorHandler.notAuthorized('Invaild refresh token'));
            }

            try {
                const {_id } = await JwtService.refreshTokenVerify(refreshToken.token)
                userId = _id;
            } catch (error) {
                return next(CustomErrorHandler.notAuthorized('Invaild refresh token'));
            }

            const user = User.findOne({_id: userId});
            if(!user){
                return next(CustomErrorHandler.notAuthorized('No user found!'));
            } 
            
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const new_refresh_token = JwtService.refreshTokenSign({ _id: user._id, role: user.role });

            // Update or recreate the refresh token entry in the database
            await RefreshToken.findOneAndUpdate(
                { token: req.body.refresh_token },
                { token: new_refresh_token },
                { new: true, upsert: true }
            );

            res.json({ access_token, new_refresh_token });

        } catch(err) {
            return next(new Error('Something went wrong' + err.message));
        }
    }
}

module.exports = refreshController;