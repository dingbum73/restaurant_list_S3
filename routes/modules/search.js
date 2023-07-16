const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('', (req, res) => {
  const keyword = req.query.keyword
  const regex = new RegExp(keyword, 'i') // 模糊搜尋
  Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})


module.exports = router