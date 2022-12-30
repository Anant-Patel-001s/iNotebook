var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Thelastofu$s';
//function
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // tokoen is not exists

    if (!token) {
        res.status(401).send({ error: "Please auhtneticate using a valid token" })
    }

    //if token is not valid

    try {
        //token verify
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please auhtneticate using a valid token" })
    }


}

module.exports = fetchuser ;