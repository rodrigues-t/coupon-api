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