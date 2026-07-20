import express from "express"
import connectDB from "./config/database.js"

const app = express()

app.get("/", (req, res) => {
    res.end("Hello from the SERVER!")
})

connectDB().
    then(() => {
    console.log("Connected to DATABASE SUCCESSFULLY...")

    app.listen(3000, () => {
        console.log("Listening on PORT 3000...")
    })
    })
    .catch((err) => {
    console.log("Error connecting DATABASE!!!", err)
})

