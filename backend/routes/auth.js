 const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Thelastofu$s';


//ROUTE 1: create a user using post "/api/auth/createuser" . no login required 
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be 5 character or above').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // check whetther the email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }

        // bcrypt passwordi
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })


        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: 'please enter unique value for email', message: err.message})})

        //without validation code

        // console.log(req.body);
        // const user = User(req.body);
        // user.save()
        //     .then((data) => {
        //         res.status(200).json({
        //             message:"Inserted",
        //             data:data._id,
        //             success:'true'
        //         })
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     })
        // res.send(res.body);

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken }) //message passing after signup new user 

        // res.json(user)

        // catching error
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Authenticate a user using post "/api/auth/login" . no login required 

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    // if there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructring

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success= false;
            return res.status(400).json({ errors: "Please try to login with correct credencials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success= false; //if error occurs than success false
            return res.status(400).json({ success, errors: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: Get loggedin User Details using post "/api/auth/getuser" . Login required 

router.post('/getuser', fetchuser, async (req, res) => {


    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password") //select all details except password
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});
module.exports = router