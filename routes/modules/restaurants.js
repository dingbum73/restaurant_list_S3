const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// CRUD_Create_render
router.get('/new', (req, res) => {
  res.render('new')
})

// CRUD_Create_to DB || Back to top set body-parser
router.post('', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })
    .then(() => res.redirect('/'))// 新增完成後導回首頁
    .catch(error => console.log(error))
})

// CRUD_Read
router.get('/:id', (req, res) => {
  // 要注意index中的<a>的_id是否正確
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => { res.render('detail', { restaurants }) })
    .catch(error => console.log(error))
})

// CRUD_Update
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((resturant) => res.render('edit', { resturant }))
    .catch((error) => console.log(error))
})


router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((resturant) => {
      resturant.name = req.body.name,
        resturant.name_en = req.body.name_en,
        resturant.category = req.body.category,
        resturant.image = req.body.image,
        resturant.location = req.body.location,
        resturant.phone = req.body.phone,
        resturant.google_map = req.body.google_map,
        resturant.rating = req.body.rating,
        resturant.description = req.body.description
      return resturant.save()// 重新賦值並存入
    })
    .then((resturant) => { res.redirect(`/restaurants/${resturant.id}`) })
    .catch(error => console.log(error))
})

// CRUD_Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.deleteOne({ _id: id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router