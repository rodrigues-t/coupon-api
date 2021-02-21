const couponServices = require('../services/database/couponServices');

async function find(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const coupons = await couponServices.find(req.userId, page, limit);
        return res.json(coupons);
    } catch (error) {
        return res.status(500).json({ error, message: 'Unknow error' });
    }
}

async function findByCode(req, res) {
    try {
        const coupon = await couponServices.findByCode(req.params.code, req.userId);
        if (coupon) {
            return res.json(coupon);
        } else {
            return res.status(404).end();
        }
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }
}

async function insert(req, res) {
    try {
        const { expirantioDate, value, unit, title, body, holder } = req.body;
        const coupon = { expirantioDate, value, unit, title, body, holder, user: req.userId };
        if(coupon.holder) {
            coupon.holder.name = coupon.holder.name.trim();
            coupon.holder.key = coupon.holder.key.trim();
        }
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
        const result = await couponServices.remove(req.params.code, req.userId);
        if (result.deletedCount === 0) {
            return res.status(404).end();
        }
        return res.send();
    } catch (e) {
        return res.status(500).json({ message: 'Unknow error' });
    }
}

async function cancel(req, res) {
    try {
        let coupon = await couponServices.findByCode(req.params.code, req.userId);
        if (!coupon) {
            return res.status(404).end();
        } else {
            if (coupon.redeemedDate) {
                return res.status(400).send({ message: 'Coupon already redeemed.' });
            } else if(coupon.cancellationDate) {
                return res.status(400).send({ message: 'Coupon already canceled.' });
            }
            await coupon.updateOne({ cancellationDate: new Date() });
        }
        return res.send();
    } catch (error) {
        return res.status(500).json({ message: 'Unknown error' });
    }
}

async function redeem(req, res) {
    try {
        let coupon = await couponServices.findByCode(req.params.code, req.userId);
        if (!coupon) {
            return res.status(404).end();
        } else {
            if (coupon.redeemedDate) {
                return res.status(400).send({ message: 'Coupon already redeemed.' });
            } else if(coupon.cancellationDate) {
                return res.status(400).send({ message: 'Coupon already canceled.' });
            }
            await coupon.updateOne({ redeemedDate: new Date() });
        }
        return res.send();
    } catch (error) {
        return res.status(500).json({ message: 'Unknown error' });
    }
}

module.exports = {
    find,
    findByCode,
    insert,
    remove,
    cancel,
    redeem
}