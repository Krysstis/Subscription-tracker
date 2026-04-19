const { body } = require('express-validator');

const registerRules = [
    body('email').isEmail().withMessage('Neteisingas el. paštas'),
    body('password').isLength({ min: 6 }).withMessage('Slaptažodis turi būti bent 6 simbolių')
];

const loginRules = [
    body('email').isEmail().withMessage('Neteisingas el. paštas'),
    body('password').notEmpty().withMessage('Slaptažodis privalomas')
];

module.exports = { registerRules, loginRules };
