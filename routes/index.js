const express = require('express')
const router = express.Router()

// 引入模組程式碼
const home = require('./modules/home')
const resturants = require('./modules/restaurants')
const search = require('./modules/search')
const orderBy = require('./modules/orderby')

router.use('/', home)
router.use('/restaurants', resturants)
router.use('/search', search)
router.use('/orderby', orderBy)

module.exports = router