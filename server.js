const express = require('express');
const server = express();

server.use(express.json());

const users = ['IGOR', 'GABRIEL', 'JOSELITO', 'MARCOS'];

server.use((req, res, next) => {
    console.time('Tempo');
    next();
    console.timeEnd('Tempo');
})

function checkNameExists(req, res, next) {
    const name = req.body.name;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    return next();
}

function checkUserInArray(req, res, next) {
    const index = req.params.index;
    if (!users[index]) {
        return res.status(400).json({ message: 'User does not exists' });
    }
    return next();
}

server.get('/users', (req, res) => {
    res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
    const index = req.params.index;
    res.json(users[index]);
});

server.post('/users', checkNameExists, (req, res) => {
    const name = req.body.name;
    users.push(name);
    res.json(users);
});

server.put('/users/:index', checkNameExists, checkUserInArray, (req, res) => {
    const index = req.params.index;
    const name = req.body.name;
    users[index] = name;
    res.json(users);
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const index = req.params.index;
    users.splice(index, 1);
    res.json(users);
})

server.listen(6666);