module.exports = function (req, res, next) {
    if (!req.session.isAuth && !req.session.isAdmin)
        return res.redirect('/auth/login')
    next()
}
