const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userSchema');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new Error("Please provide an email address");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Generate a unique reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Set token expiration time (1 hour)
        const resetTokenExpiry = Date.now() + 3600000;

        // Store the reset token and expiry time in the database
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send the reset password email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
        });

        res.status(200).json({
            message: 'Password reset email sent successfully.',
            success: true,
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};
