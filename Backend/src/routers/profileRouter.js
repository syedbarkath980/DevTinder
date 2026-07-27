import express from "express"
import userAuth from "../middlewares/userAuth.js"
import User from "../models/user.js"
import { isUpdatesAllowed, validateData } from "../../helpers/validate.js"


const profileRouter = express.Router()

profileRouter.get("/user/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})

profileRouter.delete("/user/delete", userAuth, async (req, res) => {
    try {
        const user = req.user
        const userId = user._id

        if (!user) {
            res.status(400).send("Please Login!")
        }

        await User.findByIdAndDelete(userId)
        res.status(200).send("User deleted successfully!")

    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
})

profileRouter.patch("/user/updateProfile", userAuth, async (req, res) => {
    try {
        const userId = req.user._id
        const userData = req.body

        // validate isUpdatesAllowed:
        isUpdatesAllowed(userData)

        await User.findByIdAndUpdate(userId, userData, {runValidators : true})

        res.status(200).send("Profile Updated Successfully!")

    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
})

// profileRouter.patch("/user/updatePassword", userAuth, (req, res) => {
//     // get the current password from req.body

//     // verify the current password with the given current password

//     // update the password
// })

export default profileRouter