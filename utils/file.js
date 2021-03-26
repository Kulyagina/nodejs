const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const hash = crypto
    .createHmac('md5', '123')
    .update(new Date().toISOString())
    .digest('hex')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/img')
    },
    filename(req, file, cb) {
        cb(null, hash + path.extname(file.originalname))
    },
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter,
})
