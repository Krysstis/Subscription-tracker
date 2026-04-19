const { body } = require('express-validator');

const registerRules = [
    body('email').isEmail().withMessage('Neteisingas el. paštas'),
    body('password').isLength({ min: 6 }).withMessage('Slaptažodis turi būti bent 6 simbolių')
];

const loginRules = [
    body('email').isEmail().withMessage('Neteisingas el. paštas'),
    body('password').notEmpty().withMessage('Slaptažodis privalomas')
];

const subscriptionRules = [
    body('name').notEmpty().withMessage('Pavadinimas privalomas'),
    body('category').isIn(['Streaming', 'Music', 'Productivity', 'Gaming', 'Fitness', 'Other']).withMessage('Neteisinga kategorija'),
    body('price').isFloat({ min: 0 }).withMessage('Kaina turi būti teigiamas skaičius'),
    body('billing_cycle').isIn(['weekly', 'monthly', 'yearly']).withMessage('Neteisingas mokėjimo ciklas'),
    body('next_payment_date').isDate().withMessage('Neteisinga data')
];

module.exports = { registerRules, loginRules, subscriptionRules };
