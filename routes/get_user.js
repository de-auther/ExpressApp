import { Router } from "express";
import User from "../models/user.js";
import { loginSchema } from "../validation/authValidator.js";

const router = Router();

router.get("/users",async (req, res) => {
    try{
    const users = await User.find().select("username mobile_number");
    console.log(users);
    res.json(users);
    }catch(err){
        res.json(err)
    }
});


export default router;