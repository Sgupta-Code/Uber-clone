const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: 'string',
            required: true,
            minLength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastname:{
            type: 'string',
            minLength: [3, 'Lastname must be at least 3 characters long'],
        }
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/,'Please enter a valid email address']
    },
    password: {
        type: 'string',
        required: true,
        select: false
    },
    socketId:{
        type:'string',
    },
    status:{
        type:'string',
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type:'string',
            required: true,
            minlength: [3, 'color must be at least 3 characters long']
        },
        plate:{
            type:'string',
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long']
        },
        capacity:{
            type: 'number',
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType:{
            type:'string',
            required: true,
            enum: ["car", "moto", "auto"]
        }
    },
    location:{
        ltd:{
            type:'number'
        },
        lng:{
            type:'number'
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;