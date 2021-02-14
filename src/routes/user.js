const express = require("express");
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
    async (req, res, next) => {
        passport.authenticate(
            'signup',
            { session: false },
            async (error, user) => {
                res.json({
                    error,
                    user
                });
            }
        )(req, res, next);
    }
);

module.exports = routes;