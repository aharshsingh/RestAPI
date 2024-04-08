const Joi = require('joi');
const CustomErrorHandler = require('../../customErrorHandler/CustomErrorHandler');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const JwtService = require('../../jsonWebTokenService/JwtService');

const registerController = {
    async register(req, res, next) {
        // Validation

        // Creating register schema
        const registerSchema = Joi.object({
            userName: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required(),
            confirmPassword: Joi.ref('password'),
        });

        // Validating the client
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        // If user already exists in the database
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExists('Email is already registered'));
            }
        } catch (err) {
            return next(err);
        }

        const { userName, email, password } = req.body;
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the model
        const user = new User({
            userName,
            email,
            password: hashedPassword,
        });
        let access_token;
        try {
            const result = await user.save();
            // Token
            access_token = JwtService.sign({ _id: result._id, role: result.role });
        } catch (err) {
            return next(err);
        }
        res.json({ access_token : access_token });
        // res.send('Hello, you are now registered!');
    },
};

module.exports = registerController;







// import Joi from 'joi'
// import CustomErrorHandler from '../../customErrorHandler/CustomErrorHandler'
// import User from '../../models/user';
// import bcrypt from 'bcrypt';
// import JwtService from '../../jsonWebTokenService/JwtService'
// const registerController = {
//     async register(req,res,next){
//     //validation 
            
//         //creating register schema 
//         const registerSchema = Joi.object({
//             userName : Joi.string().alphanum().min(3).max(30).required(),
//             email : Joi.string().email().required(),
//             password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required(),
//             confirmPassword : Joi.ref('password')
//         })
        
//         //validating the client
//         const { error } = registerSchema.validate(req.body);
//         if(error){
//             return next(error);
//         }

//         //if user already exists on the database
//         try{
//             const exist = await User.exists({email : req.body.email});
//             if(exist){
//                 return next(CustomErrorHandler.alreadyExits('Email is already registered'))
//             }
//         }
//         catch(err){
//             return next(err);   
//         }

//         //hashing password
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
//         //prepare the model
//         const { userName, email, password } = req.body;
//         const user = {
//             userName, 
//             email, 
//             password: hashedPassword
//         }

//         try{
//             const result = await User.save();
//             //token
//             JwtService.sign();
//         }
//         catch(err){
//             return next(err);
//         }
        

//         res.send("Hello, you are now registered!");
//     }
// }

// export default registerController;