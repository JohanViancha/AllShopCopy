
const sendVerificationEmail = (email, verificationToken)=>{
    return {
        from: "allshop.com",
        to: email,
        subject: "Email verification",
        text: `Please click the following link to verify your email : https://allshop.onrender.com/api/users/verify-token/${verificationToken}`
    }
}


module.exports = {sendVerificationEmail}