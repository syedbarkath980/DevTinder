import express from "express"
import connectDB from "./config/database.js"
import User from "./models/user.js"

const app = express()

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Syed",
        lastName: "Ali",
        email: "syedbarkath980@gmail.com",
        password: "hello@123",
        age: 21,
        gender : "male"
    }

    try {
        const user = new User(userObj)
        await user.save()
        res.status(200).send("Created User Successfully!")   
    }
    catch (err) {
        console.log("Cant create a user!!!")
        res.status(404).send("cant create a user")
    }

})

connectDB().
    then(() => {
    console.log("Connected to DATABASE SUCCESSFULLY...")

    app.listen(7777, () => {
        console.log("Listening on PORT 3000...")
    })
    })
    .catch((err) => {
    console.log("Error connecting DATABASE!!!", err)
})

