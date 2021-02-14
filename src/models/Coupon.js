const mongoose = require('mongoose')
const { getCode } = require('../services/utils/codeServices');

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

const holderSchema = new mongoose.Schema({
    name: String,
    key: {
        type: String,
        require: true
    }
});

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        index: true,
        default: () => getCode()
    },
    issueDate: {
        type: Date,
        default: () => new Date()
    },
    expirationDate: Date,
    redeemedDate: Date,
    value: Number,
    unit: String,
    title: String,
    body: String,
    holder: {
        type: holderSchema,
        default: null
    }
});

module.exports = mongoose.model('Coupon', couponSchema);