const express = require("express");
const router = express.Router();

//import controller
const { login, signup } = require("../controller/Auth");
const { isStudent, auth, isAdmin } = require("../middleware/auth");



// mapping create
router.post("/login", login);
router.post("/signup", signup);

// testing protected routes for single middleware
router.post("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Protected route for Test',
    });
});

//Protected route
router.post("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for students",
    });
});

router.post("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for admin",
    })
})

//export
module.exports = router;