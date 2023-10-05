const { response, request } = require("express");
const User = require("../models/users");
const mail = require("../mail/config");
const { sendVerificationEmail } = require("../mail/template");
const { getRandomToken, asign } = require("../utils/jwt");
const responseHttp = require("../utils/response");

const registerUser = async (req = request, res = response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(406).json({ message: "Body invalid" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(responseHttp({ codeResponse:409 }));
    }

    const newUser = new User({ name, email, password });
    newUser.verificationToken = getRandomToken();
    await newUser.save();
    mail.sendMail(
      sendVerificationEmail(newUser.email, newUser.verificationToken)
    );
    res.status(201).json(responseHttp({ codeResponse: 201 }));
  } catch (error) {
    res.status(500).json(responseHttp({ codeResponse:500, message: error }));
  }
};

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
};

const authenticateUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json(responseHttp({ codeResponse: 401 }));
    }

    if (!user.verified) {
      return res.status(403).json(responseHttp({ codeResponse: 403 }));
    }
    const token = asign({ userId: user._id });
    res.status(200).json(responseHttp({ codeResponse: 200, data: { token } }));
  } catch (error) {
    res.status(500).json(responseHttp({ codeResponse: 500, message: error }));
  }
};

const addAddresses = async (req = request, res = response) => {
  try {
    const { userId, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.addresses.push(address);
    await user.save();
    res.status(200).json(responseHttp({ codeResponse: 200 }));
  } catch (error) {
    console.log(error);
    res.status(500).json(responseHttp({ codeResponse: 500, message: error }));
  }
};

const getAddresses = async (req = request, res = response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(responseHttp({ codeResponse: 404 }));
    }

    const addresses = user.addresses;
    res.status(200).json(responseHttp({ codeResponse: 200, data: addresses }));
  } catch (error) {
    res.status(500).json(responseHttp({ codeResponse:500, message: error }));
  }
};

const getUser = async (req = request, res = response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json(responseHttp({ codeResponse: 404 }));
    }

    res.status(200).json(responseHttp({ codeResponse: 200,  data: user }));
  } catch (error) {
    res.status(500).json(responseHttp({ codeResponse:500, message: error }));
  }
};

module.exports = {
  registerUser,
  verifyToken,
  authenticateUser,
  getAddresses,
  addAddresses,
  getUser,
};
