import {Router} from "express";
import User from "../models/User.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: john
 *                   email:
 *                     type: string
 *                     example: john@email.com
 *                   mobileNumber:
 *                     type: string
 *                     example: "9876543210"
 */
router.get("/user", async (req, res) => {
    const users =  await User.findAll({
        attributes: { exclude: ['password'] }
    });
    if (!users){
        res.status(404).json({error:"No users found"});
    }
    res.json(users);
});



export default router;