const express = require("express");
const CouponController = require("../controllers/CouponController");
const auth = require("../middlewares/auth");

const Router = express.Router;

const routes = Router();

routes.use(auth);
routes.get("/coupon", CouponController.find);
routes.get("/coupon/:code", CouponController.findByCode);
routes.post("/coupon", CouponController.insert);
routes.delete("/coupon/:code", CouponController.remove);
routes.put("/coupon/:code/redeem", CouponController.redeem);

module.exports = routes;