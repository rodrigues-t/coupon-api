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