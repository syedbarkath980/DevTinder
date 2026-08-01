import express from "express"
import connectDB from "./config/database.js"
import {validateData} from "../helpers/validate.js"
import cookieParser from "cookie-parser"   // library used for reading the cookie data

// ROUTERS:
import authRouter from "./routers/authRouter.js"
import profileRouter from "./routers/profileRouter.js"
import connectionRequestRouter from "./routers/connectionRequestRouter.js"
import connectionsViewRouter from "./routers/connectionsViewRouter.js"
import userRouter from "./routers/userRouter.js"


const app = express()

// Reads JSON data from requests to make sure req.body is readable
app.use(express.json())

// Reads cookies and convert to readable form:
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", connectionRequestRouter)
app.use("/", connectionsViewRouter)
app.use("/", userRouter)


connectDB()
    .then(() => {
    console.log("Connected to DATABASE SUCCESSFULLY...")

    app.listen(3000, () => {
        console.log("Listening on PORT 3000...")
    })
    })
    .catch((err) => {
    console.log("Error connecting DATABASE!!!", err)
})
