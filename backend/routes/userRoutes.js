const express = require('express');
const { registerUser, getAllUser,loginUser } = require('../controllers/userController');
const router = express.Router();

router.get('/',getAllUser )
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
