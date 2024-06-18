const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body
    
    const user = new User({username, password})
    user.save()
    
    return res.status(200).json({
        message: 'User account created successfully'
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find()
    res.status(200).json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = parseFloat(req.params.courseId)
    const { username } = req.headers
    const course = await Course.findOne({ id: courseId })
    
    const user = await User.findOne({ username: username })
    let purchasedCoursesID = user.purchasedCoursesID

    if(!course) {

        return res.status(404).json({
            msg: 'No course found'
        })
    }
    purchasedCoursesID += `, ${courseId}`
    user.purchasedCoursesID = purchasedCoursesID
    user.save()

    res.status(200).json({
        msg: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({ username: req.headers.username })
    const Allcourses = await Course.find()
    const purchasedCoursesID = user.purchasedCoursesID

    const courses = purchasedCoursesID.split(',')
    const cleanedFormat = courses.map((ids) => parseFloat(ids))

    const purchasedCourses = Allcourses.filter((course) => cleanedFormat.includes(course.id))
    console.log(purchasedCourses)

    res.json({
        purchasedCourses
    })
    // const filteredCourses = Course.findOne({  })
});

module.exports = router