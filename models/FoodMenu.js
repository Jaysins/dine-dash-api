const mongoose = require("mongoose")


const FoodMenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        maxlength: 50
    },
    description: {
        type: String,
        required: [true, "Description is Required"],
        maxlength: 200

    },
    amount: {
        type: Number,
        required: [true, "Amount is Required"]

    },
    extras: [String]

}, {timestamps: true})



module.exports = mongoose.model("FoodMenu", FoodMenuSchema)
