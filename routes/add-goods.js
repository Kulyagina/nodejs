const { Router } = require('express')
const Goods = require('../models/goods')
const auth = require('../middleware/auth')
const upload = require('../utils/file')

const { validationResult } = require('express-validator')
const { goodsValidator } = require('../utils/validators')

const router = Router()

router.get('/', auth, async (req, res) => {
   res.render('add-goods', {
      title: 'Новый товар',
      isAdd: true,
   })
})

router.post('/', goodsValidator, async (req, res) => {
   try {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).render('add-goods', {
         title: 'Новый товар',
         isAdd: true,
         error: errors.array()[0].msg,
         data: {
            title: req.body.gtitle,
            price: req.body.gprice,
            desc: req.body.gdescr,
         },

      })
   }

   const goodses = new Goods({
      title: req.body.gtitle,
      price: req.body.gprice,
      pic: req.file ? req.file.filename : '',
      descr: req.body.gdescr,
   })

      await goodses.save()
      res.redirect('/catalog')
   } catch (error) {
      console.log(error)

      var message = ''
      if (err instanceof multer.MulterError) {
         message = `Ошибка загрузки файла: ${err.message}`
      } else if (err) {
         message = `Что-то пошло не так. Попробуйте обновить страницу.`
      }

      return res.status(422).render('add-goods', {
         title: 'Новый товар',
         isAdd: true,
         error: errors.array()[0].msg,
         data: {
            title: req.body.gtitle,
            price: req.body.gprice,
            desc: req.body.gdescr,
         }
      })
   }
})

module.exports = router
