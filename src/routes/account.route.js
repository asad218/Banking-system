const express = require("express");
const router = express.Router();
const auth = require('../middleware');
const  authMiddle  = require("../middleware/auth.middleware");

router.post('/log-in' , authMiddle.authMiddleware)






module.exports = router
