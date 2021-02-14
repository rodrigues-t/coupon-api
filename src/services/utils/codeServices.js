const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

exports.getCode = () => nanoid(12); 