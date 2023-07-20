const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log(`Connected to MongoDb Database ${mongoose.connection.host}`)
    }catch(err){
        console.log(`Mongo Connect Error`,err)
    }
};

module.exports = connectDB;