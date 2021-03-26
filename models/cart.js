class Cart {

   static async add(cart, goods) {
      const i = cart.goodses.findIndex(
          (c) => c._id.toString() === goods._id.toString()
      )
      const goodsToCart = cart.goodses[i]

      if (goodsToCart) {
         // есть в корзине
         goodsToCart.count++
         cart.goodses[i] = goodsToCart
      } else {
         // еще нет
         goods.count = 1 // добавлем счетчик товаров одного типа
         cart.goodses.push(goods)
      }

      cart.price += +goods.price // принудительно приводим к числу

      return new Promise((resolve, reject) => {
         resolve(cart)
      })
   }

   static async remove(cart, id) {
      const i = cart.goodses.findIndex((c) => c._id.toString() === id.toString())
      const goods = cart.goodses[i]

      if (goods.count === 1) {
         // если осталься только 1 такой товар
         delete cart.goodses[i]
      } else {
         // изменить количество
         cart.goodses[i].count--
      }

      cart.price -= goods.price

      return new Promise((resolve, reject) => {
         resolve(cart)
      })
   }

}

module.exports = Cart
