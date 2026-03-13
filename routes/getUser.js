import {Router} from "express";
import User from "../models/User.js";
import {Op} from "sequelize";


const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get users list
 *     description: Returns a paginated list of users with optional search and sorting.
 *     tags:
 *       - Users
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           example: john
 *         description: Search users by username or email
 *
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           example: username
 *         description: Column name to sort results
 *
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 50
 *
 *                 page:
 *                   type: integer
 *                   example: 1
 *
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *
 *                       username:
 *                         type: string
 *                         example: johndoe
 *
 *                       email:
 *                         type: string
 *                         example: john@email.com
 *
 *       500:
 *         description: Server error
 */
router.get("/user", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search;
        const sortBy = req.query.sortBy || 'id';

        const where = {};

        if (search) {
            where[Op.or] = [
                { username: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const users = await User.findAndCountAll({
            where,
            limit,
            offset,
            order:[[sortBy, 'ASC']]
        });
        res.json({
            total: users.count,
            page,
            totalPages: Math.ceil(users.count / limit),
            users: users.rows
        });
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


export default router;