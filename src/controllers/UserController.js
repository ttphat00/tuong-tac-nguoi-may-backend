const User = require('../models/User');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

class UserController {
    async getUser(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            return null;
        }
    }

    async createUser(user) {
        const newUser = new User(user);
        try {
            await newUser.save();
            return true;
        } catch (error) {
            return false;
        }
    }

    async generateToken(payload, secretSignature, tokenLife) {
        try {
            return await sign(
                {
                    payload,
                },
                secretSignature,
                {
                    algorithm: 'HS256',
                    expiresIn: tokenLife,
                },
            );
        } catch (error) {
            console.log(`Error in generate access token:  + ${error}`);
            return null;
        }
    }

    async verifyToken(token, secretKey) {
        try {
            return await verify(token, secretKey);
        } catch (error) {
            console.log(`Error in verify access token:  + ${error}`);
            return null;
        }
    }

    async index(req, res, next) {
        try {
            const users = await User.find({});
            return res.json(users);
        } catch (error) {
            return next(error);
        }
    }

    async show(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            return res.json(user);
        } catch (error) {
            return next(error);
        }
    } 

    async updatePermission(req, res, next) {
        try {
            await User.updateOne({ _id: req.params.id }, req.body);
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async updatePassword(req, res, next) {
        const hashPassword = bcrypt.hashSync(
            req.body.password,
            SALT_ROUNDS,
        );

        try {
            await User.updateOne({ _id: req.params.id }, { password: hashPassword });
            return res.json('Updated password successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async updateInfo(req, res, next) {
        try {
            await User.updateOne({ _id: req.user._id }, req.body);
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async updateAvatar(req, res, next) {
        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        try {
            await User.updateOne(
                { _id: req.user._id },
                { avatar: req.file.path },
            );
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async deleteAvatar(req, res, next) {
        try {
            await User.updateOne(
                { _id: req.user._id },
                {
                    avatar: 'https://res.cloudinary.com/petshop347/image/upload/v1647709187/icon_uyz033.png',
                },
            );
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            await User.deleteOne({ _id: req.params.id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new UserController();
