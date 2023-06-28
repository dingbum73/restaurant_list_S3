const express = require('express')
const mongoose = require('mongoose')

const port = 3000
const app = express()

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// DB connect
mongoose.connect(process.env.MONGODB_URI)

// 取得資料庫連線狀態
const db = mongoose.connection

// DB連線異常
db.on('error', () => { console.log('DB error') })

// DB成功連線
db.once('open', () => { console.log('DB connected!') })

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`It's running on http://localhost:${port}`)
})