const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken")
const jwtPass = "random1234"

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body
    const newAdmin = new Admin({username,password})

    await newAdmin.save()
    return res.json({
        msg: 'admin created',
        unique_id: newAdmin._id
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body
    const person = await Admin.findOne({username: username})

    console.log(person)

    if((!person ) || person.password !== password) {
        return res.json({
            msg: 'invalid credentials'
        })
    }

    const token = jwt.sign({username: person.username}, jwtPass)

    return res.json({
        token
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body
    const newCourse = new Course({
        title,
        description,
        price,
        imageLink
    })

    await newCourse.save()
    return res.json({
        msg: 'Course added',
        unique_id: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({})
    
    return res.json({
        allCourses
    })
});

module.exports = router;