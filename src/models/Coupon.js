/**
 * @swagger
 *  components:
 *    schemas:
 *      Coupon:
 *        type: object
 *        required:
 *          - code
 *        properties:
 *          code:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */

const mongoose = require('mongoose')
const { getCode } = require('../services/utils/codeServices');

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
    cancellationDate: Date,
    value: Number,
    unit: String,
    title: String,
    body: String,
    holder: {
        type: holderSchema,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model('Coupon', couponSchema);