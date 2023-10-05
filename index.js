const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
const mongoose = require('mongoose')
const shopItemsRoute = require('./routes/shopItems')
const authRoute = require('./routes/auth')

const connect = mongoose.connect(process.env.mongoDBURL)

connect.then(() => {
    console.log("connected to db successfully")
}).catch(err => {
    console.log("could not connect to db: " + err)
})


app.use(express.json())
app.use('/v1/shopitems', shopItemsRoute)
app.use('/v1/auth', authRoute)

app.listen(port, () => {
    console.log('Listening on port ' + port)
})

// git commit -m "chore: auth - login and register, shopItems - get, get/:id for all role and post, patch and delete for admin only"