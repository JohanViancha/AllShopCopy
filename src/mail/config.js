const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.SERVICESMAIL,
    port: process.env.PORTEMAIL,
    secure: process.env.SECUREMAIL,
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSWORDMAIL
    }
})

const sendMail = async (options) => {
    try {
        await transporter.sendMail(options)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    sendMail
}