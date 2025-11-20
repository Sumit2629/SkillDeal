const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const authHeader = req.header('Authorization');


    if (!authHeader) {
        return res.status(401).json({ msg: 'No authorization header, access denied' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Token format is not "Bearer <token>", authorization denied' });
    }

    const token = tokenParts[1];

       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next(); 
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

