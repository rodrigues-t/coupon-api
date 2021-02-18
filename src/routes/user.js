const express = require("express");
const userValidator = require("../middlewares/validation/user");
const passport = require("passport");
const Router = express.Router;

const routes = Router();

routes.post(
    '/signin',
    async (req, res, next) => {
        passport.authenticate(
            'signin',
            { session: false },
            async (error, user, message) => {
                if (error || (!user)) {
                    return res.json({
                        error,
                        message: message ? message.message : undefined
                    })
                }
                return res.json(user);
            }
        )(req, res, next);
    }
)

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