const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const extractPassword = user => {
    const { password, __v, ...userNoPw } = user.toObject();
    return userNoPw;
}

passport.use(
    'signin',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(
                        {
                            message: 'User not found',
                            errors: null,
                        },
                        false
                    );
                }
                const isValid = await user.isValidPassword(password);
                if (!isValid) {
                    return done(
                        {
                            message: 'Wrong password',
                            errors: null,
                        },
                        false
                    );
                }
                return done(
                    null,
                    {
                        user: extractPassword(user),
                        token: user.generateToken()
                    }
                );
            } catch (error) {
                return done(
                    {
                        message: 'Unknown error',
                        errors: null,
                    },
                    false
                )
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await User.create({ email, password, name: req.body.name.trim() });
                return done(null, extractPassword(user));
            } catch (error) {
                if (error.name === 'MongoError') {
                    if (error.keyValue && error.keyValue.email) {
                        done({
                            message: 'E-mail already registered.',
                            errors: {
                                email: 'E-mail already registered.'
                            }
                        });
                    } else {
                        done({ message: 'Unexpected database error.', errors: null });
                    }
                } else if (error.name === '"ValidationError') {
                    done({ message: error.message, errors: null });
                } else {
                    done({ message: 'Unknown error.', errors: null });
                }
            }
        }
    )
);
