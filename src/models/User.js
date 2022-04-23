const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        phone: { type: String, default: null },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/petshop347/image/upload/v1647709187/icon_uyz033.png',
        },
        birth: { type: Date, default: null },
        gender: { type: String, default: null },
        permission: { type: String, default: 'researcher' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
