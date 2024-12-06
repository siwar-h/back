const User = require("../models/userSchema")
const bcrypt = require('bcrypt');
// const { validationResult } = require("express-validator");

exports.userSignUp = async (req, res) => {
    console.log(req.body)

    try {
        const { email, password, username } = req.body;
        

        // Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Check password strength
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 chars, 1 letter, 1 number
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long and contain at least one letter and one number.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        // Save user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                password:hashedPassword
            },
        });
    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};


