const { Admin } = require("../db/index")
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers
    const adminInfo = await Admin.findOne({ username: username })
    // console.log(adminInfo)
    if(adminInfo && adminInfo.password === password) {
        next()
    }else {
        return res.status(404).json({
            msg: 'Invalid credentials'
        })
    }
}

module.exports = adminMiddleware;