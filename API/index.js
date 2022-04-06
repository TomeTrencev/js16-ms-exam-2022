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

