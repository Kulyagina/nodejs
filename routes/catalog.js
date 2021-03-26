const Goods = require('../models/goods')
const {Utils} = require('../models/Utils')
const {Router} = require('express')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const goodses = await Goods.find()
        res.render('catalog', {
            title: 'Кталог VR-оборудования',
            isCatalog: true,
            goodses,
        })
    } catch (e) {
        console.log(e)
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
        try {
            const goods = await Goods.findById(req.params.id)
            res.render('gcard', {
                goods,
            })
        } catch (e) {
            console.log(e)
        }
})

router.get('/:id/edit', async (req, res) => {
    const goods = await Goods.findById(req.params.id)
    res.render('edit-goods', {
        goods,
    })
})

router.post('/edit', async (req, res) => {
    let gid = req.body.gid
    delete req.body.gid
    const goods = Utils.convGoods(req.body, req.file)
    await Goods.findByIdAndUpdate(gid, goods)
    res.redirect('/catalog')
})

router.post('/delete', async (req, res) => {
    let gid = req.body.gid
    try {
        await Goods.findOneAndDelete(gid)
        res.redirect('/catalog')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
