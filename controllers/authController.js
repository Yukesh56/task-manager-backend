const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {createUser, getUserByEmail} = require("../models/userModels");
const dotenv = require("dotenv")

// Load environment variables
dotenv.config();

//Register a new user
async function registerUser(req, res){
    try{
        const {name, email, password} = req.body;

        //Chek the user already exists or not
        const existing = await getUserByEmail(email);
        if(existing){
            return res.status(409).json({message:"Email already registered"})
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creating the user
        await createUser(name, email, hashedPassword)
        res.status(201).json({ message: "User registered successfully" });
    }
    catch(error){
        console.log("Error in registerUser----->", error.essage)
        res.status(500).json({message:"Internal server Error occurred"})
    }
};

async function loginUser(req, res){
    console.log("Entered")
    try{
        const {email, password} = req.body;

        //check user exists or not
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "User is not existing invalid email" });
        }

        // Compare the password
        let isMatch  = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password." });
        }

        //Generate the jwt Token
        const token  = jwt.sign({userId: user.user_id, email: user.email}, 
            process.env.JWT_SECRET, 
            {expiresIn: '30m'});

        res.status(200).json({message:"Login Successful", token});
    }
    catch(error){
        console.log("Error in loginUser----->", error.essage);
        res.status(500).json({message:"Internal server Error occurred"});
    }
}

module.exports = {
    registerUser,
    loginUser
}