const { Router } = require('express');
const router = Router();

const { 
    registerUser
    } = require('../controllers/users')

router.get('/register', registerUser) 

module.exports = router;