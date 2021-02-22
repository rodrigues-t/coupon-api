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
 *     tags: [User]
 *     summary: Sign in
 *     description: API sign in returning user object and token.
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