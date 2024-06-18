const { User } = require("../db/index")
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers
    const user = await User.findOne({ username: username }) 

    // console.log(user);

    if(user && user.password === password) {
        next()
    }else {
        return res.status(404).json({
            msg: 'Invalid credentials'
        })
    }

}

module.exports = userMiddleware;