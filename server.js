const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'markoproject',
        database : 'final-project'
    }
});

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('Welcome!')
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
})

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
