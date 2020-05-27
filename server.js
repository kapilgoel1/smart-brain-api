const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{res.status(400).send('Success')} )

app.post('/signin', (req, res) => {signin.handleSignin(knex, bcrypt)(req, res)})

app.post('/register', (req, res) => {register.handleRegister(knex, bcrypt)(req, res)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(knex)(req, res)})

app.put('/image', (req, res) => {image.handleImage(knex)(req, res)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=>{
	console.log('App is running on port 3000');
})