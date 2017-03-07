const s3 = require('./s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid');

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: 'wdi-ldn-express-project2',
    key(req, file, next) {
      const ext = file.mimetype.replace('image/', '');
      const filename = `${uuid.v4()}.${ext}`;
      next(null, filename);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
  fileFilter(req, file, next) {
    const whiteList = ['image/png', 'image,jpeg', 'image/gif'];
    next(null, whiteList.includes(file.mimetype));
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});
