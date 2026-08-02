const express = require('express') ;
const Authrouter = require('../src/routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', Authrouter);

module.exports = app