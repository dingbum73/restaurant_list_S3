const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }) // 取出DB resturants的資料 
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router

// 回到總路由器 routes / index.js 來設定 home 模組 
