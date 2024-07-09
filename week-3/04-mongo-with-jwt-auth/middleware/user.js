const jwt = require("jsonwebtoken")
const jwtPass = "random123"

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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

module.exports = userMiddleware;