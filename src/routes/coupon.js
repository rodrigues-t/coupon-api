/**
 * @swagger
 * tags:
 *   name: Coupon
 *   description: Coupon management
 */

 /**
 * @swagger
 *  components:
 *    schemas:
 *      UnauthorizedError:
 *        type: object 
 *        properties:
 *          message:
 *            type: string
 *            description: Token invalid or missing message.
 *        example:
 *           code: Invalid token
 *      Coupon:
 *        type: object 
 *        properties:
 *          code:
 *            type: string
 *            description: Coupon unique code.  
 *          issueDate:
 *            type: date
 *            format: date
 *            description: Coupon issue date.
 *        example:
 *           code: LMO9NTCYP3NN
 *           issueDate: 2021-02-21T03:14:32.597Z
 */

 /**
 *  /coupon/:
 *    post:
 *      summary: Create a new user
 *      tags: [Coupon]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
const express = require("express");
const CouponController = require("../controllers/CouponController");
const couponValidator = require("../middlewares/validation/coupon");
const auth = require("../middlewares/auth");

const Router = express.Router;

const routes = Router();

routes.use(auth);

routes.get("/coupon", CouponController.find);

/**
 * @swagger
 * /coupon/{code}:
 *    get:
 *      summary: Get coupon by code
 *      description: Get coupon by code
 *      tags: [Coupon]
 *      parameters:
 *        - in: path
 *          name: code
 *          schema:
 *            type: string
 *          required: true
 *          description: the coupon id
 *      responses:
 *        "200":
 *          description: A coupon schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Coupon'
 *        "401": 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */
routes.get("/coupon/:code", CouponController.findByCode);
routes.post("/coupon", couponValidator.insert, CouponController.insert);
routes.delete("/coupon/:code", CouponController.remove);
routes.put("/coupon/:code/redeem", CouponController.redeem);
routes.put("/coupon/:code/cancel", CouponController.cancel);

module.exports = routes;