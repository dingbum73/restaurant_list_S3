const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  let sort = req.query.sort
  if (!sort) { sort = 'name' }
  const regex = new RegExp(keyword, 'i') // 模糊搜尋
  Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }], userId })
    .lean()
    .sort({ [sort]: 'asc' })
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))

})


module.exports = router