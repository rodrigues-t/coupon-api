const Coupon = require('../../models/Coupon');

exports.remove = async function (code) {
    return await Coupon.deleteOne({ code });
}

exports.findAll = async function (length = 100, page = 1) {
    return await Coupon.find({});
}

exports.find = async function (filter) {
    return await Coupon.findOne(filter).exec();
}

exports.findByCode = async function (code) {
    return await Coupon.findOne({ code }).exec();
}

exports.insert = async function (coupon) {
    return await new Coupon(coupon).save();
}
