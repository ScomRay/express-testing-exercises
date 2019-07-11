const express = require('express');
const bodyParser = require('body-parser');

//Express init
const app = express();

let users = [];

const removeAllElements = (array, elem) => {  
    let index = array.indexOf(elem);
    while (index > -1) {
        array.splice(index, 1);
        index = array.indexOf(elem);
    }
  }

//Config body parser to receive JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Endpoints or routes
app.get('/', (req, resp) => {
    resp.send({message: 'Your first petition'});
});
app.get('/about', (req, resp) => {
    resp.send({message: 'About page'});
});

//Get params
app.get('/user/:id', (req, resp) => {
    console.log(req.params);
    const id = Number(req.params.id);
    const userCreate = users.find(user => user.id === id);
    if (userCreate) {
        return resp.status(200).send({
        message: 'User found',
        userCreate
        });
    } else {
        return resp.status(404).send({message: 'User not found'});
    };  
});

//Queries
app.get('/search', (req, resp) => {
    const name = req.query.q;
    const userCreate = users.find(user => user.name === name);
    if (userCreate) {
        return resp.status(200).send({
            message: 'User found',
            userCreate
        });
    } else {
        return resp.status(404).send({message: 'User not found'});
    };
});

//Post user
app.post('/user', (req, resp) => {
    users.push(req.body);
    resp.status(201).send({message: 'User OK', users});
});

//Update user
app.patch('/user/:id', (req, resp) => {
    const id = Number(req.params.id);
    const userCreate = users.find(user => user.id === id);
    if (userCreate) {
        removeAllElements(users, userCreate);
        users.push(req.body);
        return resp.status(200).send({
        message: 'User updated',
        users
        });
    } else {
        return resp.status(404).send({message: 'User not found'});
    };
});

//Delete user
app.delete('/user/:id', (req, resp) => {
    const id = Number(req.params.id);
    const userCreate = users.find(users => users.id === id);
    if (userCreate) {
        removeAllElements(users, userCreate);
        return resp.status(200).send({
        message: 'User deleted'
        });
    } else {
        return resp.status(404).send({message: 'User not found'});
    };
});

//Get Users
app.get('/users', (req, resp) => {
    resp.status(200).send({users});
});

app.listen(3000, () => {
    console.log('server on port 3000');
});
