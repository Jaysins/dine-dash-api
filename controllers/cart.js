const FoodMenu = require("../models/FoodMenu")
const Cart = require("../models/Cart")
const {StatusCodes} = require("http-status-codes");
const {v4} = require('uuid');
const mongoose = require("mongoose");

const getCart = async (req, res) => {

    const cart = await Cart.findOne({sessionId: req.headers.sessionid}).populate(
        {path: "items.value"})
    res.status(StatusCodes.OK).json({cart})
}

const addToCart = async (req, res) => {

    const sessionId = req.headers.sessionid ? req.headers.sessionid : v4(undefined, undefined, undefined)

    let cart = await Cart.findOne({sessionId: sessionId})

    if (!cart) {
        cart = await Cart.create({sessionId: sessionId})
    }
    const item = req.body.foodId
    if (!item) {
        return res.status(StatusCodes.OK).json({cart})

    }

    const quantity = req.body.quantity

    const itemExist = await Cart.findOne({_id: cart._id, "items.value": item}, {"_id": 1})
    if (itemExist) {
        cart = await Cart.findOneAndUpdate({_id: cart._id, "items.value": item}, {
            "$set": {
                "items.$.quantity": quantity
            }
        }, {
            new: true, runValidators: true
        }).populate({path: "items.value"})

    } else {
        cart = await Cart.findOneAndUpdate({_id: cart._id}, {
            "$push": {
                items: {
                    value: mongoose.Types.ObjectId(item), quantity: quantity
                }
            }
        }, {
            new: true, runValidators: true
        }).populate({path: "items.value"})
    }
    res.status(StatusCodes.OK).json({cart})
}

module.exports = {getCart, addToCart}

