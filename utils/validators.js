const { body, validationResult } = require('express-validator')


exports.signupValidators = [
    body('name', 'Имя не должно содержать цифр или символов').isAlpha('ru-RU').trim(),
    body('email').isEmail().withMessage('Некорректный emails').normalizeEmail(),
    body('password', 'Пароль не должен быть меньше 6 симовлов').isLength({
        min: 6,
        max: 30,
    }).trim(),
    body('repeat').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароль не совпадают')
        }
        return true
    }).trim(),
]

exports.singinValidators = [
    body('email')
        .isEmail()
        .withMessage('Некорректный emails')
        .custom(async (value, { req }) => {
            try {
                const existUser = await User.findOne({ email: value })
                if (!existUser) {
                    return Promise.reject(
                        'Пользователь с адресом ' + value + ' не зарегистрирован'
                    )
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
]


exports.goodsValidator = [
    body('gtitle', 'Название не может быть меньше 3 символов')
        .isLength({ min: 3 })
        .trim(),
    body('gprice', 'Цена должна быть числом').isNumeric(),
]
