const express = require("express");
const rootRouter = express.Router()

const userRoutes = require("./userRoutes")(rootRouter)

rootRouter.use("/user", userRoutes)

module.exports = rootRouter
