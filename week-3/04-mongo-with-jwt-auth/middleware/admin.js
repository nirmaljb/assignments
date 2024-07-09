const jwt = require("jsonwebtoken")
const jwtPass = "random123"

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization
    const jsonToken = auth && auth.split(' ')[1] || null

    if(!jsonToken) return res.json({msg: 'invalid token'})
    const decoded = jwt.decode(jsonToken, jwtPass)

    if(!decoded) {
        return res.json({
            msg: 'incorrect token'
        })
    }
    next()
}

module.exports = adminMiddleware;