module.exports = function (req, res, next) {
    if (!req.session.shopCart) {
        req.session.shopCart = {goodses: [], price: 0}
    }

    res.locals.shopCart = req.session.shopCart
    res.locals.isAuth = req.session.isAuth
    res.locals.isAdmin = req.session.isAdmin
    next()
}
