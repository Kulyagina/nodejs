class Utils {
    static convGoods(gobj, gfile) {
        return {
            title: gobj.gtitle,
            price: gobj.gprice,
            pic: gfile? gfile.filename : "",
            descr: gobj.gdescr,
        }
    }
}


module.exports = { Utils }
