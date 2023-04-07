const express = require("express")

const router = express.Router()

const {getFoodMenu, createFoodMenu} = require("../controllers/store")

const {createOrder, getOrders} = require("../controllers/order")

const {getCart, addToCart} = require("../controllers/cart")


router.route("/foodMenu").get(getFoodMenu)

router.route("/carts").get(getCart).post(addToCart)

router.route("/orders").post(createOrder).get(getOrders)


module.exports = router

