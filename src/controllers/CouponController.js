const Coupon = require("../models/Coupon");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

async function index(req, res) {
    try {
        const coupons = await Coupon.find({});
        return res.json(coupons)
    } catch(e) {
        return res.status(500).json({message: 'Unknow error'});
    }
    
}

async function findById(req, res) {
    try {
        const coupon = await Coupon.findOne({code: req.params.id}).exec();
        if(coupon) {
            return res.json(coupon);
        } else {
            return res.status(404).end();
        }
    } catch(e) {
        return res.status(500).json({message: 'Unknow error', aa: e.message});
    }
}

async function insert(req, res) {
    try {
        const coupon = req.body
        const document = await new Coupon(coupon).save();
        res.json(document);
    } catch(e) {
        return res.status(500).json({message: 'Unknow error'});
    }
}

module.exports = {
    index,
    findById,
    insert
}