const jwt = require('jsonwebtoken');

// This middleware verifies the JWT token from the Authorization header
module.exports = function (req, res, next) {
    // Get token from the 'Authorization' header
    const authHeader = req.header('Authorization');

    // Check if the Authorization header exists
    if (!authHeader) {
        return res.status(401).json({ msg: 'No authorization header, access denied' });
    }

    // Check if the header is in the format "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Token format is not "Bearer <token>", authorization denied' });
    }

    const token = tokenParts[1];

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add the user payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

