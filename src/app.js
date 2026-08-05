const express = require('express') ;
const Authrouter = require('../src/routes/auth.routes')
const cookieParser = require('cookie-parser')
const AccountRouter = require('./routes/account.route')

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', Authrouter);
app.use('/api/accounts',AccountRouter)

module.exports = app