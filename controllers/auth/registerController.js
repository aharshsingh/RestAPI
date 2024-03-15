import Joi from 'joi'
import CustomErrorHandler from '../../customErrorHandler/CustomErrorHandler'
import { User } from '../../models/';
import bcrypt from 'bcrypt';
import JwtService from '../../jsonWebTokenService/JwtService'
const registerController = {
    async register(req,res,next){
    //validation 
            
        //creating register schema 
        const registerSchema = Joi.object({
            userName : Joi.string().alphanum().min(3).max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required(),
            confirmPassword : Joi.ref('password')
        })
        
        //validating the client
        const { error } = registerSchema.validate(req.body);
        if(error){
            return next(error);
        }

        //if user already exists on the database
        try{
            const exist = await User.exists({email : req.body.email});
            if(exist){
                return next(CustomErrorHandler.alreadyExits('Email is already registered'))
            }
        }
        catch(err){
            return next(err);   
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        //prepare the model
        const { name, email, password } = req.body;
        const user = {
            name, 
            email, 
            password: hashedPassword
        }

        try{
            const result = await User.save();
            //token
            JwtService.sign();
        }
        catch(err){
            return next(err);
        }
        

        res.send("Hello, you are now registered!");
    }
}

export default registerController;