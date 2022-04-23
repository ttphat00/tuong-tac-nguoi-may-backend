const bcrypt = require('bcrypt');
const userController = require('./UserController');
const SALT_ROUNDS = 10;

class AuthController {
    async register(req, res, next) {
        const email = req.body.email.toLowerCase();
        const user = await userController.getUser(email);
        if (user) res.status(409).json('Tài khoản đã tồn tại.');
        else {
            const name = req.body.name;
            const hashPassword = bcrypt.hashSync(
                req.body.password,
                SALT_ROUNDS,
            );
            const newUser = {
                name,
                email,
                password: hashPassword,
            };
            const createUser = await userController.createUser(newUser);
            if (!createUser) {
                return res
                    .status(400)
                    .json(
                        'Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.',
                    );
            }
            return res.json({
                name,
                email,
            });
        }
    }

    async login(req, res) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user = await userController.getUser(email);
        if (!user) {
            return res.status(401).json('Email không tồn tại.');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json('Mật khẩu không chính xác.');
        }

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
            email: user.email,
        };
        const accessToken = await userController.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return res
                .status(401)
                .json('Đăng nhập không thành công, vui lòng thử lại.');
        }

        // let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
        // if (!user.refreshToken) {
        //     // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        //     await userModel.updateRefreshToken(user.username, refreshToken);
        // } else {
        //     // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        //     refreshToken = user.refreshToken;
        // }

        return res.json({
            msg: 'Đăng nhập thành công.',
            accessToken,
            // refreshToken,
            user,
        });
    }
}

module.exports = new AuthController();
