const express = require("express");
const router = express.Router();

//import controller
const { login, signup } = require("../controller/Auth");
const { isStudent, auth, isAdmin } = require("../middleware/auth");
const User = require("../models/User");



// mapping create
router.post("/login", login);
router.post("/signup", signup);

// testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Protected route for Test',
    });
});

//Protected route
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for students",
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for admin",
    })
})

router.get("/email", auth, async (req, res) => {

    try {
        const id = req.user.id;
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            user: user,
            message: `data fetched successfully`,
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error`,
        })

    }
})

//export
module.exports = router;