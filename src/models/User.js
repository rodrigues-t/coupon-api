/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - _id
 *          - email
 *          - name
 *        properties:
 *          _id:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          name:
 *            type: string
 *        example:
 *           _id: 602eeb4fee2b082a10799704
 *           name: Robert Plat
 *           email: plant@email.com
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

userSchema.pre(
    'save',
    async function(next) {
        if(!this.isModified('password')) {
            next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    }
)

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign({id: this.id}, process.env.TOKEN_SECRET, {
        expiresIn: 3600
    })
}

module.exports = mongoose.model('User', userSchema);