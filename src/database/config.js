require('dotenv').config();
const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.6sezljb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`, {
        useNewUrlParser: process.env.USENEWURLPARSER,
        useUnifiedTopology: process.env.USEUNIFIEDTOPOLOGY
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error)
    })
}
module.exports = connectDatabase;