const express = require('express');
const app = express();
const port = 5050;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();
const cookieParser = require('cookie-parser');
const adminRoute = require('./routes/adminRoutes');
const productRoute = require('./routes/productsRoutes');
const contactRoute = require('./routes/contactRoutes');
const cors = require('cors');

// MongoDB Store
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySession'
});

// Middleware
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL encoded body parser
app.use(cookieParser());

// CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 60 * 1000
    },
    store: store
}));

// Routes
app.use( adminRoute);
app.use( productRoute);
app.use( contactRoute);

mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log('MongoDB Bağlantısı Başarılı');
        app.listen(port, () => {
            console.log(`Aydın Plastik Projesi ${port}'unda Çalışıyor`);
        });
    })
    .catch(err => {
        console.error(err);
    });
