const validate = require('../../helpers/validate')
const singup = (req, res, next) => {
    const rule = {
        "name": "required|string|min:2|max:100",
        "email": "required|email",
        "password": "required|string|min:6"
    }

    const validation = validate(req.body, rule, "Validation error.");
    if (!validation.success) {
        return res.status(400).send(validation.error);
    }
    next();
}

module.exports = {
    singup
}