const { Router } = require('express');
const router = Router();

const { 
    registerUser,
    verifyToken,
    authenticateUser,
    getAddresses,
    addAddresses,
    getUser
    } = require('../controllers/users')

router.post('/register', registerUser) 
router.get('/verify-token/:token', verifyToken) 
router.post('/authenticate-user', authenticateUser) 
router.post('/add-addresses', addAddresses)
router.get('/addresses/:userId', getAddresses),
router.get('/getUser/:userId', getUser) 


module.exports = router;