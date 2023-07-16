const express = require('express')
const router = express.Router()

// 引入模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const orderBy = require('./modules/orderby')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


router.use('/restaurants', authenticator, restaurants)
router.use('/search', search)
router.use('/orderby', orderBy)
router.use('/users', users)
router.use('/', authenticator, home)


module.exports = router