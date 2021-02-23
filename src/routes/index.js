/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   -bearerAuth: []
 */

const coupon = require("./coupon");
const user = require("./user");

module.exports = [user, coupon];