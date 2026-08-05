const accountModel = require('../models/account.model');
const userModel = require('../models/user.model');


async function createAccountcontroller(req, res) {
    const user = req.user;
    try {
        const account = await accountModel.create({
            user: user._id
        });

        return res.status(201).json({
            message: "Success ! New account created",
            account
        });
    } catch (err) {
        console.error('Account creation failed:', err);
        return res.status(500).json({ message: 'Failed to create account' });
    }
}

module.exports = { createAccountcontroller };