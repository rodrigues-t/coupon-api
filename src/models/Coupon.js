/**
 * @swagger
 *  components:
 *    schemas:
 *      Coupon:
 *        type: object 
 *        required:
 *          - code
 *          - issueDate
 *          - expirationDate
 *          - user
 *          - title
 *          - body
 *        properties:
 *          code:
 *            type: string
 *            description: Coupon unique code.  
 *          issueDate:
 *            type: date
 *            format: date
 *            description: Coupon issue date.
 *          expirationDate:
 *            type: date
 *            format: date
 *            description: Coupon expiration date.
 *          redeemedDate:
 *            type: date
 *            format: date
 *            description: Coupon redeemed date. Coupon is redeemed if redeemedDate is present in the object.
 *          cancellationDate:
 *            type: date
 *            format: date
 *            description: Coupon redeemed date. Coupon is cancelled if cancellationDate is present in the object.
 *          value:
 *            type: number
 *            description: Value of coupon.
 *          unit:
 *            type: string
 *            description: Unit of value (%, $, €, etc.).
 *          user:
 *            type: string
 *            description: System user id who generate the coupon
 *          title:
 *            type: string
 *            description: Coupon short description.
 *          body:
 *            type: string
 *            description: Coupon extra description.
 *        example:
 *           code: LMO9NTCYP3NN
 *           issueDate: 2021-02-21T03:14:32.597Z
 *           redeemedDate: 2021-02-20T12:14:32.397Z
 *           value: 10
 *           unit: %
 *           user: 602eeb4fee2b082a10799704
 *           title: Book discount
 *           body: Big discount in whole books section...
 *           
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