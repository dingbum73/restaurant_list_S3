const express = require('express')
const router = express.Router()

// 引入模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const orderBy = require('./modules/orderby')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')


router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/orderby', authenticator, orderBy)
router.use('/users', users)
router.use('/auth',auth) 
router.use('/', authenticator, home)


module.exports = router