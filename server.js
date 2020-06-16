const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signIn = require('./Controllers/signIn');
const image = require('./Controllers/image');
const profile = require('./Controllers/profile');



const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

// db.select('*').from('users').then( data =>{
//     console.log(data);
// })


const app = express();

//middleware to convert text to json
app.use(express.json());
app.use(cors())


//diplaying root element or homepage 
app.get('/', (req, res) => {res.send('it is working')})

//sign in request
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})


//registering new user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})


//finding new user
app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res, db)})


//updating image count
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

//getting face detection from image via API
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is working on port ${process.env.PORT}`)
})



