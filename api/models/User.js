const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 5,
        max: 20,
    },
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 50,
        default: ''
    },
    city: {
        type: String,
        max: 50,
        default: ''
    },
    from: {
        type: String,
        max: 50,
        default: ''
    },
    relationship: {
        type: Number,
        enum: [1,2,3],
        default: ''
    },
    profilePicture: {
        type: String,
        default: 'person/noavatar.jpeg'
    },
    coverPicture: {
        type: String,
        default: 'cover/nocover2.jpg'
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    notificaciones: {
        type: Number,
        default: 0
    },
    solicitudesAmistad: {
        type: Number,
        default: 0
    },
    mensajesPorLeer: {
        type: Number,
        default: 0
    }
    
},{timestamps: true});


module.exports = mongoose.model("User", UserSchema)