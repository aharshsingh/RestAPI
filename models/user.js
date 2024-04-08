const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');
//first arugment is the name of the model, second is the name of schema, third is the collection name of this model in database