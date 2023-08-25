const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// SignUp New User
const signUp = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, userType } = req.body;

    if (!firstname || !lastname || !email || !password || !userType) {
        console.log("Validation error: Please Include all fields");
        res.status(400);
        throw new Error('Please Include all fields');
    }

    // Find if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log("User already exists");
        res.status(400);
        throw new Error('User already exists');
    } else {
        console.log("User does not exist");

    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        userType,
    });

    if (user) {
        console.log("User created successfully");
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            userType: user.userType,
            token: generateToken(user._id),
        });
    } else {
        console.log("Error creating user");
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//User SignIn
const signIn = asyncHandler(async(req,res) => {
    const{email, password} = req.body

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

//SignOut


module.exports = {
    signUp,
    signIn,
};
