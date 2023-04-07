const mongoose = require("mongoose")



const ItemSchema = new mongoose.Schema({
    value: {
        type: [mongoose.Types.ObjectId],
        ref: 'FoodMenu'
    },
    quantity: {
        type: "Number",
        required: true
    }
})

const CartSchema = new mongoose.Schema({

    sessionId: {
        type: String,
        required: true
    },
    items: {
        type: [ItemSchema],
        required: false
    }
}, {timestamps: true})


module.exports = mongoose.model("Cart", CartSchema)
