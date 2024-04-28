const CustomErrorHandler = require('../customErrorHandler/CustomErrorHandler');
const  Product  = require('../models/product')
const multer = require('multer');
const path = require('path');

//first we need to setup the storage for the file with the help of the diskStorage function which takes the destination where file needs to be saved and filename for the file itself
// const storage = multer.diskStorage({
//     destination : (req,file, cb) => cb(null, 'uploads/'),
//     filename : (req, file, cb) => {
//         const uniqueName = `${Date.now()}-${Math.round(Math.round()*1E9)}${path.extname(file.originalname)}`;
//         cb(null, uniqueName);
//     }
// });
const storage = multer.diskStorage({
    destination : (req,file, cb) => cb(null, 'uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.round()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
})
const handleMultipartData = multer({ storage, limits:{fileSize: 1000000*5}}).single('image')

const productController = {
    addProducts(req,res,next) {
        //mutlipart form data
        handleMultipartData(req,res,async (err) => {
            if(err){
                console.error(err);
                return next(CustomErrorHandler.serverError(err.message));
            }
            else{
                // console.log("File data:", req.file);  // Log file data
                // console.log("Body data:", req.body);  // Log body data

                // console.log(req.file);
                const filePath = req.file.path;
                const { name,price,about,material,care,colour,gender,fit,size,rating,discount } = req.body;
                // Prepare the model
                const product = new Product({
                name,
                price,
                about,
                material,
                care,
                colour,
                gender,
                fit,
                size,
                rating,
                discount,
                image: filePath
                });
                let result
                try {
                    result = await product.save();
                } catch (err) {
                    return next(err);
                }
                console.log(result);
                res.json('product uploaded successfully');
                // res.json({});
            }
        });
        
    // Validation

        // Creating register schema
        // const productSchema = Joi.object({
        //     userName: Joi.string().alphanum().min(3).max(30).required(),
        //     email: Joi.string().email().required(),
        //     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required(),
        //     confirmPassword: Joi.ref('password'),
        // });

        // // Validating the client
        // const { error } = productSchema.validate(req.body);
        // if (error) {
        //     return next(error);
        // }
        // If user already exists in the database
        // try {
        //     const exist = await Product.exists({ pid: req.body.pid });
        //     if (exist) {
        //         return next(CustomErrorHandler.alreadyExists('Product already exists in database'));
        //     }
        // } catch (err) {
        //     return next(err);
        // }
     },

    async showProducts(req,res,next) {
        let documents;
        try{
            // documents = await Product.find(); this method will give an array of all the products in the database 
            documents = await Product.find().select('-__v');   //second method is done with  the help of pagination library name: mongoose-pagination
        }catch(err){
            return next(err);
        }
        return res.json(documents);
    },

    async showSingleProduct(req,res,next) {
        let document;
        try {
            document = await Product.findOne({_id: req.params.id});
            console.log(document);
        } catch (error) {
            return next(CustomErrorHandler.notFound());
        }
        return res.json(document);
    }
}

module.exports = productController;