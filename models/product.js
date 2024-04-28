const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {APP_URL} = require('../config')

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    about: { type: String, required: true },
    material: { type: String, required: true },
    care: { type: String, required: true },
    colour: { type: String, required: true },
    gender: { type: String, required: true },
    fit: { type: String, required: true },
    size: { type: String, required: true },
    rating: { type: String, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true, get: (image)=>{
        const imageUrl = image.replace(/\\/g, '/');
        console.log(`Getting image URL: ${APP_URL}/${imageUrl}`);
        return `${APP_URL}/${imageUrl}`;
    }},
    // image: { data: Buffer, contentType: String }
    // image:{ data: Buffer, contentType: String, required: true}
    // image2:{ type: String, required: true},
    // image3:{ type: String, required: true},
    // image4:{ type: String, required: true},
},{toJSON: { getters: true}, toObject: { getters: true }});

module.exports = mongoose.model('Product', productSchema, 'products');
