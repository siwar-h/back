exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            throw new Error("Invalid request");
        }

        const user = await userModel.findOne({ resetToken, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            throw new Error("Invalid or expired reset token");
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update the user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({
            message: 'Password reset successfully',
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
