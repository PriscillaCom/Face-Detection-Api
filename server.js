const express = require('express');
const bodyParser = require('body-parser');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const user = require('./controllers/user');

const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const database = knex({
    client: 'pg',
    connection: {
        host : 'postgresql-tetrahedral-65929',
        user : 'postgres',
        password : '9696',
        database : 'detection'
    }
});

database.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('it is working')
});

app.post('/signin', (req,res) => {
    signin.handleSignin(req,res,database,bcrypt)}
);

app.post('/register', (req,res) => {
    register.handleRegister(req,res,database,bcrypt)}
);

app.post('/imageurl', (req,res) => { 
    image.handleApiCall(req,res)}
);

app.get('/profile/:id',(req,res)=> 
    user.handleUser(req,res,database)
)

app.put('/image',(req,res) => {
    image.handleImage(req,res,database);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('app running port:',process.env.PORT);
})
