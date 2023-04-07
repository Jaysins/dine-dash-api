const Order = require("../models/Order")
const {StatusCodes} = require("http-status-codes");
const {BadRequestError} = require("../errors");
const Cart = require("../models/Cart");


const createOrder = async (req, res) => {
    const body = req.body
    const sessionId = req.headers.sessionid

    if (!sessionId) {
        throw new BadRequestError("Invalid session ID")
    }
    const cart = await Cart.findOne({sessionId: sessionId}).populate({path: "items.value"})

    if (!cart) {
        throw new BadRequestError("Invalid session ID")
    }
    const buyer = req.body.buyer
    const cartItems = []
    let total_fee = 0
    let total_quantity = 0

    cart.items.map(item => {
        const value = item.value[0]
        cartItems.push({
            name: value.name, description: value.description, amount: value.amount,
            quantity: item.quantity
        })
        total_fee += value.amount
        total_quantity += item.quantity
    })

    console.log(cartItems, total_fee, total_quantity)
    const order = await Order.create({
        buyer: buyer, cartItems: cartItems,
        total_fee: total_fee, total_quantity: total_quantity, sessionId: sessionId
    })

    await Cart.findOneAndDelete({_id: cart._id})
    res.status(StatusCodes.OK).json({order, status: "success"})
}

const getOrders = async (req, res) => {
    const orders = await Order.find({sessionId: req.headers.sessionid}).sort("createdAt")
    res.status(StatusCodes.OK).json({orders})
}

module.exports = {createOrder, getOrders}
