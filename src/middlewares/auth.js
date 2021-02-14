const jwt = require("jsonwebtoken");
require('dotenv/config');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({message: "No token provided"});
    }
    const [scheme, token] = authHeader.split(" ");
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decoded.id;
        return next();
    } catch(error) {
        return res.status(401).json({message: "Invalid token"});
    }
}