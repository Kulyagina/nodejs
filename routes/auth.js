const {Schema, model} = require('mongoose')
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const SessionSchema = new Schema({_id: String}, {strict: false})
const Sessions = model('sessions', SessionSchema)
const {validationResult} = require('express-validator')
const {signupValidators} = require('../utils/validators')

const mailRegister = require('../utils/emails/registration')
const mailer = require('../utils/mailer')

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация в магазине',
        isLogin: true,
        errSignup: req.flash('err-signup'),
        errSignin: req.flash('err-signin'),
    })

})


router.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body
        const existUser = await User.findOne({email})

        if (existUser) {
            const checkPass = await bcrypt.compare(password, existUser.password)
            if (checkPass) {
                req.session.isAdmin = existUser.isAdmin
                req.session.isAuth = true
                const existSession = await Sessions.findOne({
                    'session.user': existUser._id,
                }).lean()
                if (existSession) {
                    req.session.shopCart = existSession.session.shopCart

                    await Sessions.deleteOne({_id: existSession._id}, (err) => {
                        if (err) throw err
                    })
                }
                req.session.user = existUser._id
                req.session.save((err) => {
                    if (err) throw err
                    res.redirect('/')
                })
            } else {
                // wrong pass
                req.flash('err-signin', 'Неверный пароль')
                res.redirect('/auth/login')
            }
        } else {
            // user not found
            req.flash(
                'err-signin',
                'Пользователь с адресом ' + email + ' не зарегистрирован'
            )
            res.redirect('/auth/login')
        }


    } catch (e) {
        console.log(e)
    }
})


router.post('/signup', signupValidators, async (req, res) => {
    try {
        const {name, email, password, repeat} = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            req.flash('err-signup', errors.array()[0].msg)
            return res.status(422).redirect('/auth/login#signup')
        }


        if (password.toString() !== repeat.toString()) {
            req.flash(
                'err-signup',
                'Пароли не совпадают'
            )
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashPassword})

        await user.save()
        res.redirect('/auth/login')
        mailer(mailRegister(email))
    } catch (e) {
        if (e.keyPattern.email) {
            req.flash(
                'err-signup',
                'Пользователь с адресом ' +
                e.keyValue.email +
                ' уже зарегистрирован'
            )
        } else {
            console.log(e)
        }
        res.redirect('/auth/login#signup')
    }
})


router.get('/exit', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/auth/login')
        })
    } catch (error) {
        console.log(error);
    }
})


module.exports = router

