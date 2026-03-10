import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { signUpSchema, loginSchema } from "../validation/authValidator.js";


const router = express.Router();

// SignUp...

router.post("/signup", async (req, res) => {
    try {
        const data = signUpSchema.parse(req.body);
        //console.log(data);
        const hashed_pass = await bcrypt.hash(data.password, 5);
        //console.log(hashed_pass);
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: hashed_pass,
            phone_number: data.phone_number
        });
        console.log(user);
        res.json({
            id: user._id,
            username:user.username,
            email:user.email,
            phone_number:user.phone_number
        });
    }catch (err) {
        res.status(400).json({error: err.message});
    }
});


// Login...

router.post("/login", async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);
        console.log(data);
        const user = await User.findOne({email: data.email});
        
        if (!user) {
            return res.status(400).json({error: "Invalid credentials"});
        }
        const valid_pass = await bcrypt.compare(data.password, user.password);
        if (!valid_pass) {
            return res.status(400). json({error: "Invalid credentials"});
        }
        req.session.userId = user.user_id;
        res.json({message: "Login successful"});
    }catch (err) {
        res.status(400).json({error: err.message});
    }
        });

router.post("/logout", (req, res) => {
    req.session.destroy(()=> {
        res.json({message: "Logout successful"});
    });
});


export default router;