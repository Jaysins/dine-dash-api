const FoodMenu = require("../models/FoodMenu")
const {StatusCodes} = require("http-status-codes");

const getFoodMenu = async (req, res) => {
    const foodMenu = await FoodMenu.find({}).sort("createdAt")
    res.status(StatusCodes.OK).json({foodMenu, count: foodMenu.length})
}


const createFoodMenu = async (req, res) => {
    console.log(req.body)
    const menu = await FoodMenu.create(req.body)
    res.status(StatusCodes.CREATED).json({menu})

}
module.exports = {getFoodMenu, createFoodMenu}

