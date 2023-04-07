const mongoose = require("mongoose")
const {Schema} = require("mongoose");


const BuyerSchema = new Schema({
    name: {
        type: String, required: [true, "Name required"]
    }, phone: {
        type: String, required: [true, "Phone required"]
    }, email: {
        type: String, required: false
    },
    street: {
        type: String, required: true
    },
    city: {
        type: String, required: true
    },
    state: {
        type: String, required: true
    },
    country: {
        type: String, required: false
    },
})

const OrderItemSchema = new Schema({
    name: {
        type: String, required: [true, "Name required"]
    }, description: {
        type: String, required: [true, "description required"]
    }, amount: {
        type: Number, required: [true, "amount is required"]
    }, quantity: {
        type: Number, required: [true, "Quantity Required"]
    }
})

const OrderSchema = new Schema({

    total_fee: {
        type: "Number", required: [true, "amount is required"]
    },
    total_quantity: {
        type: "Number", required: [true, "amount is required"]
    },
    cartItems: {
        type: [OrderItemSchema], required: [true, "Items is required"]
    },
    buyer: {
        type: [BuyerSchema],
        required: true
    },
    sessionId: {
        type: String,
        required: [true]
    }

}, {timestamps: true})


module.exports = mongoose.model("Order", OrderSchema)

