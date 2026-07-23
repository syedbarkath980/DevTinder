import express from "express"
import connectDB from "./config/database.js"
import User from "./models/user.js"
import validateData from "../helpers/validate.js"
import bcrypt from "bcrypt"

const app = express()

// Reads JSON data from requests to make sure req.body is readable
app.use(express.json())


// API - Create a User
app.post("/signup", async (req, res) => {
    try {

        const {firstName, lastName, email, password, age, gender, photoUrl, skills} = req.body

        // Validation:
        validateData(req)

        // Password Hashing / Encrypting:
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            gender,
            photoUrl,
            skills
        })

        await user.save()

        res.status(201).send("Created User Successfully!")
    } catch (err) {
        console.error("Cant create a user!!!", err)
        res.status(400).send("cant create a user")
    }
})

// API - GET user by userId
app.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        res.status(200).send(user)
    } catch (err) {
        console.log("Something Went Wrong!")
    }
})

// API - GET user by email
app.get("/user", async (req, res) => {
    try {
        const email = req.body.email
        const user = await User.find({ email: email})
        res.status(200).send(user)
    } catch (err) {
        console.log("Something went wrong!", err)
    }
})

// API - GET all the users / feed
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).send(user)
    } catch (err) {
        console.log("Error Fetching the Feed")
    }
})

// API - DELETE a user by using ID
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId
        await User.findByIdAndDelete(userId)
        res.status(200).send("User deleted Successfully!")
    } catch (err) {
        console.log("Error deleting USER")
    }
})


// API - PATCH a user by using user id
app.patch("/user/:userId", async (req, res) => {
    try {
        const ALLOWED_UPDATES = ["firstName", "lastName", "password", "gender", "photoUrl", "age", "skills"]

        const userId = req.params.userId
        const data = req.body

        if (Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key)) && (!data.skills || data.skills.length <= 10)) {
            await User.findByIdAndUpdate(userId, data, { runValidators: true })
            res.status(200).send("User Updated Successfully!")
            console.log("Succeeded")
        }
        else {
            throw new Error("CANNOT UPDATE EMAIL")
        }

    }
    catch (err) {
        res.send("UPDATE FAILED" + err)
        console.log("Error updating the user DATA!")    
    }
})

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
