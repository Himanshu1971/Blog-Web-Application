import mongoose from 'mongoose';

const {Schema,model} = mongoose;
const postschema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const posts = model('posts', postschema);
export default posts;