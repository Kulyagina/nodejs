const Goods = require('../models/goods')
const Cart = require("../models/cart");
const {Router} = require('express')

const router = Router()

router.post('/add/:id', async (req, res) => {
    const cart = req.session.shopCart
    const goods = await Goods.findById(req.params.id).lean()
    req.session.shopCart = await Cart.add(cart, goods)
    req.session.save((err) => {
        if (err) throw err
        res.redirect('/cart')
    })
})

router.get('/', async (req, res) => {
    const cart = req.session.shopCart
    res.render('cart', {
        title: 'Корзина',
        isCart: true,
        goodses: cart.goodses,
        sumPrice: cart.price,
    })
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.session.shopCart, req.params.id)
    req.session.save((err) => {
        if (err) throw err
        res.json(req.session.shopCart)
    })

})

module.exports = router
