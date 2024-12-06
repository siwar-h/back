const bcrypt = require('bcryptjs');
const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
                sameSite: 'Strict',
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                success: true,
                error: false,
                redirectToHome: true, // Flag to let the front end know to navigate
            });
        } else {
            throw new Error("Please check your password");
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};
  

