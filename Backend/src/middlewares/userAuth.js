import jwt from "jsonwebtoken"
import User from "../models/user.js"

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
    
        if (!token) {
            throw new Error("User Not logged in!")
        }

        const userId = await jwt.verify(token, "Dev@Tinder12")
    
        const user = await User.findById({_id : userId._id})

        req.user = user

        next()
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }

}

export default userAuth