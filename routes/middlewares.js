require("dotenv").config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const isUserLoggedIn = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) {
        res.status(401).send("no-authorization-header")
        return;
    }

    const val = authorizationHeader.split(" ")
    const tokenType = val[0]
    const tokenValue = val[1]

    if(tokenType == "Bearer") {
        const decoded = jwt.verify(tokenValue, secret)
        req.decoded = decoded
        next();
        return;
    }

    res.status(401).send("not-authorized")
}

const adminsOnly = (req, res, next) => {
    if(req.decoded.role == "admin") {
        next()
    } else {
        res.status(403).send("action-not-allowed")
    }
}

module.exports = {isUserLoggedIn, adminsOnly}