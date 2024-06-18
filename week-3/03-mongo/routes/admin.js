const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index")


// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body
    
    const admin = new Admin({username, password})
    admin.save()
    
    return res.status(200).json({
        message: 'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink, published } = req.body
        
    const course = new Course({
        id: parseFloat(Math.random()*100).toFixed(3),
        title,
        description,
        price,
        imageLink,
        published: published || true
    })
    course.save()

    res.status(200).json({
        message: 'Course created successfully',
        courseID: parseFloat((Math.random() * 50).toFixed(3))
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find()
    res.status(200).json({
        courses: allCourses
    })
});

module.exports = router;