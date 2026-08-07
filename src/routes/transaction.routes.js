const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const transactionRoutes = Router();
const transactionController = require('../controllers/transaction.controller');

transactionRoutes.post('/' , authMiddleware.authMiddleware , transactionController.createTransaction)
transactionRoutes.get('/system/initial-funds' , authMiddleware.authSystemMiddleware , transactionController.createTransaction)





module.exports = transactionRoutes;
