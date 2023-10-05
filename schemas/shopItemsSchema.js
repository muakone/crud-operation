const mongoose = require('mongoose')

const shopItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    isInStock: {
        type: Boolean,
        required: true
    },
}, {timestamps: true})

const shopItemsCollection = mongoose.model("shopitems", shopItemsSchema)

module.exports = ({ shopItemsCollection })