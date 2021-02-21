const validate = require('../../helpers/validate')

const customRule = {
    name: "holder_rule",
    callbackFn: (value, requirement, attribute) => {
        if (value.name === null || value.name.trim() === '' ||
            value.key === null || value.key.trim() === '') {
            return false;
        }
        return true;
    },
    errorMessage: "Holder's name and key are required"
}

const insert = (req, res, next) => {
    const rule = {
        "expirationDate": "date",
        "value": "numeric|required",
        "unit": "string|required",
        "title": "string|required|min:2|max:100",
        "body": "string|min:2|max:300",
        "holder": "holder_rule",
        "holder.name": "string|min:2|max:100",
        "holder.key": "string|min:2|max:100"
    }
    const validation = validate(req.body, rule, "Validation error.", [customRule]);
    if (!validation.success) {
        return res.status(400).send(validation.error);
    }
    next();
}

module.exports = {
    insert
}