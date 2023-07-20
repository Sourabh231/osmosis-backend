const mongoose = require('mongoose');
const growingModel = require('../models/growingModel');
const userModel = require('../models/userModel');

//GET ALL BLOGS
exports.getAllBlogsController = async(req,res)=>{
    try {
        const blogs = await growingModel.find({}).populate('user');
        if (!blogs) {
            return res.status(400).send({
                sucess: false,
                message: 'No Blog Found'
            })
        }
        return res.status(200).send({
            sucess: true,
            BlogCount: blogs.length,
            message: 'All Blogs sucessfully listed',
            blogs
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            sucess: false,
            message: 'Error wile Getting Blogs',
            err
        });
    }
}

//Create blog || POST

exports.creategrowingController = async(req,res)=>{
    try {
        const { title, description, image,user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                sucess: false,
                message: 'Please provide all fields'
            })
        }
        const existingUser = await userModel.findById(user)
        //validation
        if(!existingUser){
            return res.status(404).send({
                sucess:false,
                message:'Unable to find user'
            })
        }
        const newBlog = new growingModel({ title, description, image,user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})//it saves the new blog document within the transaction 
        existingUser.blog.push(newBlog)//we can add the new blog to the existing blog
        await existingUser.save({session})// we can save these blog
        await session.commitTransaction();//which persists the changes made during the transaction to the database
        await newBlog.save()
        return res.status(200).send({
            sucess: true,
            message: 'Blog Created',
            newBlog
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            sucess: false,
            message: 'Error while creating the Blog',
            err
        })
    }
}