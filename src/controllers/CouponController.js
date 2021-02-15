const couponServices = require('../services/database/couponServices');

async function find(req, res) {
    try {
        const coupons = await couponServices.findAll();
        return res.json(coupons);
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }

}

async function findByCode(req, res) {
    try {
        const coupon = await couponServices.findByCode(req.params.code);
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
        const document = await couponServices.insert(coupon);
        res.json(document);
    } catch (e) {
        return res.status(500).json({
            error: e,
            message: 'Unknow error'
        });
    }
}

async function remove(req, res) {
    try {
        const result = await couponServices.remove(req.params.code);
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
        let coupon = await couponServices.find({ code: req.params.code });
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