/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

const express = require("express");
const userValidator = require("../middlewares/validation/user");
const passport = require("passport");
const Router = express.Router;

const routes = Router();

/**
 * @swagger
 * /signin:
 *   post:
 *     security: []
 *     tags: [User]
 *     summary: Sign in
 *     description: API sign in returning user object and token
 *     requestBody:
 *       description: A JSON object containing credentials information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:  
 *                 type: string
 *             example:
 *               email: youremail@fake.com
 *               password: yourpassword
 *     responses:
 *       "200":
 *         description: User schema and token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciO...LvjQ9_AwCwojg6KgtE"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "400":
 *         description: Sign in problem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum: [Missing credentials, User not found, Wrong password, Unknown error]
 *                   example: "Wrong password"
*/
routes.post(
    '/signin',
    async (req, res, next) => {
        passport.authenticate(
            'signin',
            { session: false },
            async (error, user, passportFailMessage) => {
                if (error || (!user)) {
                    if (passportFailMessage) {
                        return res.status(400).json({
                            message: passportFailMessage.message,
                            errors: null
                        });
                    }
                    return res.status(400).json(error);
                }
                return res.json(user);
            }
        )(req, res, next);
    }
)

/**
 * @swagger
 * /signup:
 *   post:
 *     security: []
 *     tags: [User]
 *     summary: Sing up
 *     description: API sign up.
 */
routes.post(
    "/signup",
    userValidator.singup,
    async (req, res, next) => {
        passport.authenticate(
            'signup',
            { session: false },
            async (error, user) => {
                if (error) {
                    return res.status(400).json(error);
                }
                return res.json(user);
            }
        )(req, res, next);
    }
);

module.exports = routes;