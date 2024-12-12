// const userModel = require('../models/user.model');
// const userService = require('../services/user.services');
// const {validationResult} = require('express-validator');


// module.exports.registerUser = async(req, res, next) => {

//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }

//     const {fullname,email,password} =req.body;

//     const isUserAlready = await userModel.findOne({ email });

//     if (isUserAlready) {
//         return res.status(400).json({ message: 'User already exist' });
//     }

//     const hashedPassword = await userModel.hashPassword(password);

//     const user = await userService.createUser({
//         firstname: fullname.firstname,
//         lastname: fullname.lastname,
//         email,
//         password: hashedPassword
//     });

//     const token = user.generateAuthToken();

//     res.status(201).json({ token, user });

// }

// module.exports.loginUser = async (req, res,next)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }

//     const {email,password} = req.body;

//     const user = await userModel.findOne({email}).select('+password');

//     if(!user){
//         return res.status(401).json({message:'Invalid email or password'});
//     }
//      const isMatch = await user.comparePassword(password);

//      if(!isMatch){
//         return res.status(401).json({message:'Invalid email or password'});
//      }

//      const token = user.generateAuthToken();

//      res.cookie('token', token);
//      res.status(200).json({token,user});
// }

const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        if (!fullname || !fullname.firstname || !fullname.lastname) {
            return res.status(400).json({ message: 'Fullname must include firstname and lastname' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};