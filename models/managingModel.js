const mongoose = require('mongoose');

const managingSchema = new mongoose.Schema({
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

const managingModel = mongoose.model('managing',managingSchema);

module.exports= managingModel;