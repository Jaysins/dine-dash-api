require("dotenv").config()
require("express-async-errors")

const express = require("express")

const app = express();

const connectDB = require("./models/connect")

const notFoundMiddleware = require("./middleware/authentication")
const errorHandlerMiddleware = require("./middleware/error-handler")
const authenticationMiddleware = require("./middleware/authentication")

const storeRouter = require("./routes/store")


app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to Dine Dash API")
})

app.use(`/api/${process.env.API_VERSION}/store`, storeRouter)

app.use(notFoundMiddleware)
app.use(authenticationMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {

        console.log(error)
    }
}

start()
