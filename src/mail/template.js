require('dotenv').config();

const sendVerificationEmail = (email, verificationToken)=>{
    return {
        from: "allshop.com",
        to: email,
        subject: "Email verification",
        text: `Please click the following link to verify your email : ${process.env.URLDOMAIN}${process.env.URLPATHUSER}/verify-token/${verificationToken}`
    }
}


module.exports = {sendVerificationEmail}