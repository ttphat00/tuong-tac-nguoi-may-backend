const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

const fileUploader = require('../config/cloudinary.config');

const authMiddleware = require('../middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

//get user profile by token
router.get('/profile', isAuth, async (req, res) => {
    res.json(req.user);
});

router.put('/update-my-info', isAuth, userController.updateInfo);
router.put(
    '/update-my-avatar',
    fileUploader.single('file'),
    isAuth,
    userController.updateAvatar,
);
router.put('/delete-my-avatar', isAuth, userController.deleteAvatar);
router.put('/reset-password/:id', userController.updatePassword);
router.put('/:id', userController.updatePermission);

router.delete('/:id', userController.destroy);

router.get('/:id', userController.show);
router.get('/', userController.index);

module.exports = router;
