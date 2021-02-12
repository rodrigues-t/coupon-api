const Coupon = require("../models/Coupon");

async function find(req, res) {
    try {
        const coupons = await Coupon.find({});
        return res.json(coupons);
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }

}

async function findByCode(req, res) {
    try {
        const coupon = await Coupon.findOne({ code: req.params.id }).exec();
        if (coupon) {
            return res.json(coupon);
        } else {
            return res.status(404).end();
        }
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error', aa: e.message });
    }
}

async function insert(req, res) {
    try {
        const coupon = req.body
        const document = await new Coupon(coupon).save();
        res.json(document);
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }
}

async function remove(req, res) {
    try {
        const result = await Coupon.deleteOne({ code: req.params.code });
        if (result.deletedCount === 0) {
            return res.status(404).end();
        }
        return res.send();
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }
}

async function redeem(req, res) {
    try {
        let coupon = await Coupon.findOne({ code: req.params.code });
        if (!coupon) {
            return res.status(404).end();
        } else {
            if (coupon.redeemedDate) {
                return res.status(400).send({
                    errors: [
                        { code: ['Coupon already redeemed.'] }
                    ]
                });
            }
            await coupon.updateOne({ redeemedDate: new Date() });
        }
        return res.send();
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }
}

module.exports = {
    find,
    findByCode,
    insert,
    remove,
    redeem
}