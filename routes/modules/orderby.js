const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/name', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/category', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/restaurants/new', (req, res) => {
  res.render('new')
})

module.exports = router