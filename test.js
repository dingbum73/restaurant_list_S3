const ResturantList = require('./restaurant.json')

for (let i = 0; i < ResturantList.results.length ; i++){
  console.log(ResturantList.results[i].name)
}

