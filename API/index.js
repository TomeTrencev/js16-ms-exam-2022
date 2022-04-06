const config = require('./pkg/config');
require('./pkg/db');

const express = require('express');
const jwt = require('express-jwt');
const auth = require('./handlers/auth');

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.get('service').jwt_key,
    algorithms: ['HS256']
}).unless({
    path: [
       
    ]
}));

api.get('/api/plant', auth.getAll);
api.get('/api/plant/:id', auth.getOne);
api.post('/api/plant', auth.create);
api.put('/api/plant/:id', auth.update);
api.patch('/api/plant/:id', auth.updatePartial);
api.delete('/api/plant/:id', auth.remove);

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

api.listen(config.get('service').port, err => {
    if (err) return console.log(err);
    console.log(`Server started on port ${config.get('service').port}`);
});