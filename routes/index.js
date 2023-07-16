const express = require('express')
const router = express.Router()

// 引入模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const orderBy = require('./modules/orderby')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/orderby', orderBy)
router.use('/users', users)


module.exports = router