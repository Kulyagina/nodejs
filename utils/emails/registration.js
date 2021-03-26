const settings = require('../../settings/index')

module.exports = function (email) {
    return {
        to: email,
        from: settings.EMAIL_FROM,
        subject: 'Ваш аккаунт создан',
        html: `
      <h1>Добро пожаловать в наш магазин ${settings.SHOP_NAME}</h1>
      <p>Вы успешно создали аккаунт. Для входа используйте ваш адрес - ${email}</p>
    `,
    }
}
