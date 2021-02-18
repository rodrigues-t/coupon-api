const Validator = require('validatorjs');

const validate = (data, rules, message) => {
    const validation = new Validator(data, rules, message);
    if (validation.fails()) {
        return {
            success: false,
            error: {
                message,
                errors: validation.errors.errors
            }
        }
    }
    return {
        success: true,
        message,
        error: null
    }
}

module.exports = validate;