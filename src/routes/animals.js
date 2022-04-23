const express = require('express');
const animalController = require('../controllers/AnimalController');
const router = express.Router();

const fileUploader = require('../config/cloudinary.config');

const authMiddleware = require('../middleware/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.post('/', fileUploader.array('file'), isAuth, animalController.store);
router.delete('/:id', animalController.destroy);
router.put('/:id', fileUploader.array('file'), animalController.update);

//get categories by id_user
// router.get('/my-categories', isAuth, categoryController.showByIdUser);

router.get('/:id', animalController.show);
router.get('/', animalController.index);

module.exports = router;
