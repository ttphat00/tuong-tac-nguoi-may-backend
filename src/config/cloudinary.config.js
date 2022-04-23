const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'petshop347',
    api_key: '671475459873361',
    api_secret: '0H9IzWBXio9Xi1hJqYKWKJo94RU',
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
