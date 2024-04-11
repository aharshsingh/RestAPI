const CustomErrorHandler = require('../../customErrorHandler/CustomErrorHandler');
const User = require('../../models/user')

const userController = {
    async userInfo(req,res,next){
        try {
            const user = await User.findOne({_id: req.user._id}).select('-password -updatedAt -createdAt -__v')
            if(!user){
                return next(CustomErrorHandler.notFound('User not found'))
            }
            res.json(user);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = userController;