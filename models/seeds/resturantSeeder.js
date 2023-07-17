const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Restaurant = require('../restaurant')
const RestaurantList = require('../restaurantList.json')

const SEED_USER_ONE = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  ownRestaurant: [1, 2, 3] //擁有#1,#2,#3餐廳
}

const SEED_USER_TWO = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  ownRestaurant: [4, 5, 6]
}

const seedUsers = [SEED_USER_ONE, SEED_USER_TWO]


db.once('open', () => {
  const seedUsersRun = seedUsers.map(seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const start = seedUser.ownRestaurant[0]
        return Promise.all(Array.from(
          { length: 3 },
          (value, i) => Restaurant.create({
            name: RestaurantList.results[start + i].name,
            name_en: RestaurantList.results[start + i].name_en,
            category: RestaurantList.results[start + i].category,
            image: RestaurantList.results[start + i].image,
            location: RestaurantList.results[start + i].location,
            phone: RestaurantList.results[start + i].phone,
            google_map: RestaurantList.results[start + i].google_map,
            rating: RestaurantList.results[start + i].rating,
            description: RestaurantList.results[start + i].description,
            userId
          })
        ))
      })
      .then(() => {
        console.log(seedUser.name, 'done')
      })
      .catch(err => console.log(err))
  })
  Promise.all(seedUsersRun)
    .then(() => {
      console.log('All done')
      process.exit()
    })
    .catch(err => console.log(err))
})




