const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body
    if(!username || !password) {
        return res.status(404).json({
            msg: 'Invalid Credentials'
        })
    }
    const admin = new Admin({username, password})
    admin.save()
    return res.status(200).json({
        msg: 'Admin account created'
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;