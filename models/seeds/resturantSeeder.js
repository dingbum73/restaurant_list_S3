const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const RestaurantList = require('../restaurantList.json')


db.once('open', () => {
  for (let i = 0; i < RestaurantList.results.length; i++) {
    Restaurant.create({
      name: RestaurantList.results[i].name,
      name_en: RestaurantList.results[i].name_en,
      category: RestaurantList.results[i].category,
      image: RestaurantList.results[i].image,
      location: RestaurantList.results[i].location,
      phone: RestaurantList.results[i].phone,
      google_map: RestaurantList.results[i].google_map,
      rating: RestaurantList.results[i].rating,
      description: RestaurantList.results[i].description,
    })
  }
  console.log('done')
})