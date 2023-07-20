const mongoose = require('mongoose');

const growingSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:[true,'user id is required']
    }
},{timestamps:true})

const growingModel = mongoose.model('growing',growingSchema);

module.exports= growingModel;