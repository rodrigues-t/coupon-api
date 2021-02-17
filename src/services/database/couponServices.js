const Coupon = require('../../models/Coupon');

exports.find = async function (userId, length = 100, page = 1) {
    return await Coupon.find({ user: userId }).exec();
}

exports.findByCode = async function (code, userId) {
    return await Coupon.findOne({ code, user: userId }).exec();
}

exports.insert = async function (coupon) {
    return await new Coupon(coupon).save();
}

exports.remove = async function (code, userId) {
    return await Coupon.deleteOne({ code, user: userId });
}
