module.exports = {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    MDB_URL: process.env.MDB_URL,

    DIR_PUBLIC: 'public',
    DIR_IMAGES: 'img',

    SHOP_NAME: 'VRToday',

    EMAIL_FROM: `noreply@site.local`,
    SMTP_HOST: 'smtp.ethereal.emails',
    SMTP_PORT: 587,
    SMTP_SECURE: false,
}
