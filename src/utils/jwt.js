
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const getRandomToken = () => {
    return crypto.randomBytes(20).toString("hex");
}

const asign = (userId) => {
    return jwt.sign({ userId }, getRandomToken())
}

module.exports = { getRandomToken, asign };