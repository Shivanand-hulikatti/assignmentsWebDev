const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secr8'

function authMiddleware(req,res,next){
    const token = req.headers.authorization;

    const response = jwt.verify(token,JWT_SECRET);

    if(response){
        req.userId = response.userId;
        next();
    }else{
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    authMiddleware,
    JWT_SECRET,
}