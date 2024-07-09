const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")
const jwt = require("jsonwebtoken")
const jwtPass = "random1234"

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body
    const newUser = new User({
        username: username,
        password: password,
    })


    await newUser.save()
    return res.json({
        msg: 'user created',
        unique_id: newUser._id
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body
    const person = await User.findOne({username: username})

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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    const allCourses = await Course.find({})
    
    return res.json({
        allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId
    const username = req.body.username

    try {
        const course = await Course.findById(id)
        
        if(!course) {
            return res.json({
                msg: 'No such course found'
            })
        }
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCoursesID: id
            }
        })
        
        res.json({
            message: "Purchase complete!"
        })
    
    }catch(err) {
        console.log(err)
        return res.json({error: err})
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne({username: req.headers.username})

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCoursesID
        }
    })

    res.json({
        courses
    })

});

module.exports = router