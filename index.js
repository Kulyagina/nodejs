const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const express = require('express')
const session = require('express-session')
const varsMw = require('./middleware/vars')
const mainRouter = require('./routes/main')
const catRouter = require('./routes/catalog')
const addRouter = require('./routes/add-goods')
const cartRouter = require('./routes/cart')
const authRoute = require('./routes/auth')
const MongoSession = require('connect-mongodb-session')(session)
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const settings = require('./settings/index')
const h = require('handlebars')
const flash = require('connect-flash')

const fileMulter = require('./middleware/file')
const helmet = require('helmet')

const app = express()


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const store = new MongoSession({
    collection: 'sessions',
    uri: settings.MDB_URL,
    autoIndex: true
})

app.use(
    session({
        secret: settings.SECRET,
        resave: false,
        saveUninitialized: false,
        store,
    })
)

app.use(varsMw)
app.use(flash())
app.use(fileMulter.single('gpic'))
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                'default-src': ['*'],
                'img-src': ['*'],
                'script-src': ['*'],
            },
        },
    })
)

const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(h),
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/helpers'),
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use('/', mainRouter)
app.use('/catalog', catRouter)
app.use('/add', addRouter)
app.use('/cart', cartRouter)
app.use('/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(settings.MDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(settings.PORT, () => {
            console.log(`Server running at ${settings.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


