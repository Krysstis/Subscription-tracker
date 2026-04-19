const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { subscriptionRules } = require('../middleware/validation');
const { getAll, getOne, create, update, patch, remove } = require('../controllers/subscriptionController');

router.get('/', auth, getAll);
router.get('/upcoming', auth, require('../controllers/statsController').upcoming);
router.get('/:id', auth, getOne);
router.post('/', auth, subscriptionRules, create);
router.put('/:id', auth, subscriptionRules, update);
router.patch('/:id', auth, patch);
router.delete('/:id', auth, remove);

module.exports = router;
