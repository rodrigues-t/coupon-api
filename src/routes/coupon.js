const express = require("express");
const CouponController = require("../controllers/CouponController");
const couponValidator = require("../middlewares/validation/coupon");
const auth = require("../middlewares/auth");

const Router = express.Router;

const routes = Router();

routes.use(auth);
routes.get("/coupon", CouponController.find);
routes.get("/coupon/:code", CouponController.findByCode);
routes.post("/coupon", couponValidator.insert, CouponController.insert);
routes.delete("/coupon/:code", CouponController.remove);
routes.put("/coupon/:code/redeem", CouponController.redeem);

module.exports = routes;