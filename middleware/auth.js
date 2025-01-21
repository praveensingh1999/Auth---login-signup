const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract jwt token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer", "");
        console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }

        // this way we fetch data INSIDE from token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wroung, while verifying the token ",
        })
    }
}

exports.isStudent = (req, res) => {
    try {

        if (req.user.role == 'Student') {
            return res.status(401).json({
                success: false,
                message: "this is protect route for student",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Role is not matching',
        })
    }

}

exports.isAdmin = (req, res) => {
    try {
        if (req.user.role == 'Admin') {
            return res.status(401).json({
                success: false,
                message: "this is protect route for admin",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Role is not matching',
        })
    }

}