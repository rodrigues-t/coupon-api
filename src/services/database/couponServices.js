const Coupon = require('../../models/Coupon');

exports.find = async function (userId, page = 1, limit = 100) {
    const coupons = await Coupon.find({ user: userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    const count = await Coupon.countDocuments({ user: userId });
    const totalPages = Math.ceil(count / limit);
    return {
        coupons,
        page,
        totalPages,
        totalItems: count
    }
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