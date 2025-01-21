const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        // check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                succes: false,
                message: "user already exist",
            });
        }
        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                succes: false,
                message: "Error in hashing password",
            });
        }

        // create entry of user in database
        const user = await User.create({ name, email, password: hashedPassword, role })

        return res.status(200).json({
            success: true,
            message: "User Signup Successfully",
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            succes: false,
            message: "User cannot be signup please try again letter",
        })
    }
}


// login 



exports.login = async (req, res) => {
    try {
        // Data fetch
        const { email, password } = req.body;

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully',
            });
        }

        // Check for registered user
        const user = await User.findOne({ email });

        // If not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                success: false,
                message: "Password incorrect",
            });
        }

        // Create payload
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        // Create JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        // Remove sensitive data before sending the response
        const userData = user.toObject();
        delete userData.password;

        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true, // Not accessible via JavaScript
        };

        // Send response
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: userData,
            message: 'User Logged In Successfully',
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        });
    }
};



