module.exports = {
    mult(var1, var2) {
        return var1 * var2
    },
    iftrue(var1, var2, options) {
        if (var1 === true && var2 === true) return options.fn(this)

        return options.inverse(this)
    },
    ifeq(var1, var2, options) {
        if (var1 === var2) return options.fn(this)

        return options.inverse(this)
    },
}
