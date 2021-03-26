
const nodemailer = require('nodemailer')
const settings = require('../settings/index')

module.exports = async function (template) {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: settings.SMTP_HOST,
        port: settings.SMTP_PORT,
        secure: settings.SMTP_SECURE,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    })

    try {
        const info = await transporter.sendMail(template)

        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    } catch (e) {
        console.log(e)
    }
}

