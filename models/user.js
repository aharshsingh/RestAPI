import mongoose from 'mongoose';
const schema = mongoose.schema;

const userSchema = new schema({
    name : { type: string, required: true},
    email : { type: string, required: true, unique: true},
    password : { type: string, required: true},
    role : { type: string, default: 'customer'},
}, { timestamps : true});

export default mongoose.model('User', userSchema, 'users');