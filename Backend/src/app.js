import express from "express"
import connectDB from "./config/database.js"
import User from "./models/user.js"
import validateData from "../helpers/validate.js"
import bcrypt from "bcrypt"       // library used for encryting the data like password for storing inside DB.
import jwt from "jsonwebtoken"    // library used for creating a token.
import cookieParser from "cookie-parser"   // library used for reading the cookie data
import userAuth from "./middlewares/userAuth.js"

const app = express()

// Reads JSON data from requests to make sure req.body is readable
app.use(express.json())

// Reads cookies and convert to readable form:
app.use(cookieParser())


// API - POST for SIGNUP/Create a User
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

// API - POST for Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        
        const user = await User.findOne({email : email})
        if (!user) {
            throw new Error("Invalid Credentials")
        }

        const isUserExist = await bcrypt.compare(password, user.password)
        if (!isUserExist) {  
            throw new Error("Invalid Credentials")
        }
        else {
             // create a JWT token:
            const userToken = jwt.sign({ _id: user._id }, "Dev@Tinder12", {
                expiresIn : '0d'
            })

            // wrap the token inside a cookie:
            res.cookie("token", userToken)

            res.status(200).send("User Logged in Successfully!")
        }

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)  // Prevents Information Leaking.
    }
})

// API - GET for profile
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})


app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).send(`${user.firstName} sent connection request!`)
    } catch (error) {
        res.status(400).send("Error" + error.message)
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
