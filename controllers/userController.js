const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//create user register user
exports.registerController = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        //validation
        if (!name || !email || !password || !cpassword) {
            return res.status(401).send({
                sucess: false,
                message: 'Please fill all fields'
            })
        }

        //confirm password check
        if (password !== cpassword) {
            return res.status(400).send({
                message: false,
                message: 'Password and confirm password did not matched'
            })
        }

        //existing user
        const existinguser = await userModel.findOne({ email });
        if (existinguser) {
            return res.status(500).send({
                sucess: false,
                message: 'User already Exists'
            })
        }

        //convert our password now in hashing using bcrypt
        const hashPassword = await bcrypt.hash(password, 10)// 10 is the salt value

        //for save user
        const user = new userModel({name, email, password: hashPassword, cpassword: hashPassword });
        user.save()
            .then(savedUser => {
                console.log(savedUser);
                return res.status(200).send({
                    sucess:true,
                    message:'New  user Created',
                    user
                })
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message:"Error in Registerd Callback",
                    Success:false,
                    err
                })
            });
            

        //generate token
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // return res.status(200).send({
        //     sucess: true,
        //     message: 'sucessfully registerd',
        //     token
        // })
    } catch (err) {
        console.log(err);
        return res.status(200).send({
            message: 'Error in Registered callback',
            sucess: false,
            err
        })
    }
};

//create login
exports.loginController = async(req, res) => {
     try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(401).send({
                sucess:false,
                message:'Please provide email and password'
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                sucess: false,
                message: 'Email is not registerd'
            })
        }
        //password
        const isMatchPass = await bcrypt.compare(password,user.password)
        if(!isMatchPass){
            return res.status(201).send({
                sucess:false,
                message:'Password is Matched',
            })
        }

        //generate token
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);

        return res.status(201).send({
            sucess:true,
            message:"login sucessfull",
            token
        });
     }catch(err){
        console.log(err);
        return res.status(400).send({
            sucess:false,
            message:'Error in Login Callback',
            err
        })
     }
};

//-----------------------------------------------------------------------------------------------

//get all user
exports.getAlluser = async (req, res) => {
    try{
        const users = await userModel.find({});
        return res.status(201).send({
            sucess:true,
            userCount:users.length,
            message:'All users Data',
            users
        })

    }catch(err){
        console.log(err);
        return res.status(400).send({
            sucess:false,
            message:"Error in Get All Users",
            err
        })
    }
};