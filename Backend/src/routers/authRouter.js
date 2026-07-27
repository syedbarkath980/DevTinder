import express from "express"
import {validateData, isUpdatesAllowed} from "../../helpers/validate.js"
import bcrypt from "bcrypt"       // library used for encryting the data like password for storing inside DB.
import User from "../models/user.js"
import jwt from "jsonwebtoken" 

const authRouter = express.Router()


authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
            const userToken = await user.getJWT();

            // wrap the token inside a cookie:
            res.cookie("token", userToken)

            res.status(200).send("User Logged in Successfully!")
        }

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)  // Prevents Information Leaking.
    }
})

authRouter.post("/logout", async (req, res) => {
    try {
        const { token } = req.cookies
           
        if (!token) {
            throw new Error("User Not logged in!")
        }
        else {
            const isTokenValid = await jwt.verify(token, "Dev@Tinder12")
            if (!isTokenValid) {
                res.send("Invalid TOKEN")
            } else {
                res.clearCookie("token")
                res.status(200).send("User logout successfully!")
            }
            
        }
            
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
})


export default authRouter