const { response, request } = require('express');
const User = require('../models/users')
const mail = require('../mail/config')
const { sendVerificationEmail } = require('../mail/template')

const { getRandomToken, asign } = require('../utils/jwt')


const registerUser = async (req = request, res = response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(406).json({ message: "Body invalid" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ name, email, password });
        newUser.verificationToken = getRandomToken();
        await newUser.save();
        mail.sendMail(sendVerificationEmail('vianchajohan@gmail.com', '123')).then((aa)=>{
            console.log(aa)
        })
        res.status(201).json({
            message: "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Registration failed",
            error
        })
    }
}


const verifyToken = async (req = request, res = response) => {
    try {
        const token = req.params.token;

        if (!token) {
            return res.status(406).json({ message: "Body invalid" });
        }

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
}


const authenticateUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if (!user.verified) {
            return res.status(401).json({ message: "user has not been verified" });
        }
        const token = asign({ userId: user._id })
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
}

const addAddresses = async (req = request, res = response) => {
    try {
        const { userId, address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.addresses.push(address);
        await user.save();
        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error addding address" });
    }
}

const getAddresses = async (req = request, res = response) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
    }
}


const getUser = async (req = request, res = response) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile" });
    }
}

module.exports = {
    registerUser,
    verifyToken,
    authenticateUser,
    getAddresses,
    addAddresses,
    getUser
}