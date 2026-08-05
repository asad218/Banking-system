const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function authMiddleware(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access ! token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded?.userId || decoded?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized Access ! invalid token" });
        }

        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Unauthorized Access ! user not found" });
        }

        req.user = user;
        return next();

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized Access ! invalid token"
        });
    }

}


module.exports = {authMiddleware};