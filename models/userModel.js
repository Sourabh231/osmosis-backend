const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Username is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    cpassword:{
        type:String,
        required:[true,"Confirm password is requred"]
    },
    blog:[
        {
            type:mongoose.Types.ObjectId,
            ref:'growing',
        }
    ]
    
},{timestamps:true})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;