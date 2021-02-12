const express = require("express");
const CouponController = require("../controllers/CouponController");

const Router = express.Router;

const routes = Router();

routes.get("/coupon", CouponController.index);
routes.get("/coupon/:id", CouponController.findById);
routes.post("/coupon", CouponController.insert);

module.exports = routes;