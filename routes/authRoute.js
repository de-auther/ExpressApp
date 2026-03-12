import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signUpSchema, loginSchema } from "../validation/authValidator.js";


const router = express.Router();

// SignUp...
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/signup", async (req, res) => {
  try {
    console.log(`body is ${JSON.stringify(req.body)}`);
    const data = signUpSchema.parse(req.body)
    console.log('Validation successful:', data);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      username:data.username,
      email:data.email,
      password: hashedPassword,
      mobileNumber:data.mobileNumber,
      
    });

    res.json({
      message: "User created",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login...

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
    try {
        const data = loginSchema.parse(req.body)
        const user = await User.findOne({ where: { email: data.email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const validPass = await bcrypt.compare(data.password, user.password);
        if (!validPass) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        req.session.userId = user.id;
        res.json({ message: "Logged in successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});




/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user and destroy session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
    });
});

export default router;