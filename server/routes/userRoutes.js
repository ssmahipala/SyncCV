const express = require('express')
const router = express.Router()
const { signUp, signIn } = require('../controllers/userController')

// const {protect} = require('../middleware/authMiddleware')

router.post('/signup', signUp)
router.post('/signin', signIn)
// router.get('/welcome', welcome)
// router.patch('/update', protect, updateUser)

module.exports = router