const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Resturant = require('./models/resturant')

const port = 3000
const app = express()

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// DB connect
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection

// DB連線異常
db.on('error', () => { console.log('DB error') })

// DB成功連線
db.once('open', () => { console.log('DB connected!') })

// setting static files
app.use(express.static('public'))

// setting template engine
app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: 'hbs' }).engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  Resturant.find() // 取出DB resturants的資料 
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(resturants => res.render('index', { resturants }))
    .catch(error => console.log(error))

})



app.listen(port, () => {
  console.log(`It's running on http://localhost:${port}`)
})