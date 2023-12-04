const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const formRoutes = require('./routes/form')
const authRoutes = require('./routes/auth')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
).then(() => console.log('Connected to db successfully'))
    .catch((err) => { console.error(err); });

app.use('/form', formRoutes)
app.use('/auth', authRoutes)

app.listen(4000, () => {
    console.log('SERVER RUNNING!!')
})