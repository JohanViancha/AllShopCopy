const { Router } = require('express');
const router = Router();

const {
    getOrders,
    registerOrders
} = require('../controllers/orders')

router.get('/getorder/:userId', getOrders)
router.post('/registerOrders', registerOrders)

module.exports = router;