const mongoose = require('mongoose')
const Resturant = require('../resturant')
const ResturantList = require('../restaurantList.json')

if(process.env.NODE_ENV !=='production'){
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',()=>{
  console.log('DB error')
})

db.once('open',()=>{
  console.log('DB connected')
  for (let i = 0; i < ResturantList.results.length; i++) {
    Resturant.create({name:ResturantList.results[i].name,
      name_en: ResturantList.results[i].name_en,
      category: ResturantList.results[i].category,
      image: ResturantList.results[i].image,
      location: ResturantList.results[i].location,
      phone: ResturantList.results[i].phone,
      google_map: ResturantList.results[i].google_map,
      rating: ResturantList.results[i].rating,
      description: ResturantList.results[i].description,})
  }
  console.log('done')
})