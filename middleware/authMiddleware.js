const jwt = require('jsonwebtoken');

// Set a secret key for signing and verifying JWTs
const secretKey = 'my-secret-key';

// Authenticate a user and return a JWT
function generateToken(payload) {

    try {
        //create a JWT containing the user's id and other claims
        return jwt.sign(payload, secretKey);
    } catch (e) {
        throw new Error(e.message)
    }

}

// Verify a JWT and return the decoded payload
function verify(req, res, next) {
    try {
        const token = req.cookies.accessToken

        // Verify the JWT and return the decoded payload
        req.user = jwt.verify(token, secretKey)
        next()
    } catch (err) {
        // If the JWT is invalid, return an error
        // throw new Error('Invalid token');
        res.status(401)
        res.statusMessage = "Invalid token"
        res.json({
            message: err.message
        })
        res.end()
    }
}

module.exports = {
    generateToken,
    verify
};

