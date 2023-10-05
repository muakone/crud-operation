const express = require('express')
const route = express.Router()
const { shopItemsCollection } = require('../schemas/shopItemsSchema')
const { isUserLoggedIn, adminsOnly } = require('./middlewares')

route.use(isUserLoggedIn)

route.get("/", async (req, res) => {
    const shopItems = await shopItemsCollection.find();
    res.json(shopItems)
})

route.get('/:id', async (req, res) => {
    const { id } = req.params
    const shopItem = await shopItemsCollection.findById(id)
    if(!shopItem) {
        return res.status(404).send("not-found")
    }
    res.status(200).send(shopItem)
})

route.post('/', adminsOnly, async (req, res) => {
    const { name, description, price, isInStock } = req.body
    const newShopItem = await shopItemsCollection.create({
        name,
        description,
        price,
        isInStock
    })

    res.json({
        isRequestSuccesful: true,
        message: "A new item has been added succesfully",
        newShopItem
    })
})

route.patch('/:id', adminsOnly, async (req, res) => {
    const { id } = req.params
    const { name, description, price, isInStock } = req.body
    const updatedShopItem = await shopItemsCollection.findByIdAndUpdate(id, {
        name,
        description,
        price,
        isInStock
    }, {new: true})

    res.json({
        message: "item updated sccessfully",
        updatedShopItem
    })
})

route.delete('/:id', adminsOnly, async (req, res) => {
    const { id } = req.params
    await shopItemsCollection.findByIdAndDelete(id)
    res.send("item has been deleted sccessfully")
})

module.exports = route