const express = require("express");
const router = express.Router();
const  authMiddle  = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controler")

router.post('/' , authMiddle.authMiddleware , accountController.createAccountcontroller )






module.exports = router
