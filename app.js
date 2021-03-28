const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cookieParser = require('cookie-parser')
const path = require('path')


const {PORT,URIS} = require('./server/config')


mongoose.connect(URIS,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:true})
    .then(()=> console.log("Terhubung ke Database"))
    .catch(err => console.log(err))

const dataSession = new MongoDBStore({
    uri : URIS,
    collection: "session"
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.set('halaman', path.join(__dirname, 'client'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        key: "user_sid",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: dataSession,
        cookie: { maxAge: 1000 *60 *60 *60 },
    })
);

app.use('/authentication', require('./server/controllers/controller-auth'))

app.use(require('./server/auth'))
app.use('/data', require('./server/controllers/controller-data'))
app.use('/ubah', require('./server/controllers/controller-ubah'))
app.use('/tables', require('./server/controllers/controller-tables'))
app.use('/pinjam', require('./server/controllers/controller-pinjam'))
app.get('/', (req,res,next) => {
    res.render('dashboard', {
        user : req.session.user.dataPengguna,
        title : "Dashboard"

    })
})
// app.use('/data')



app.listen(PORT, () => {
    console.log(`Project berjalan di http://localhost:${PORT}`);
})