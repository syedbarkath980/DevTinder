import express from "express"
import userAuth from "../middlewares/userAuth.js"
import ConnectionRequest from "../models/connectionReq.js"
import mongoose from "mongoose"
import User from "../models/user.js"


const connectionRequestRouter = express.Router()

connectionRequestRouter.post("/request/send/:status/:toUserid", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const status = req.params.status
        const toUserId = req.params.toUserid


        await ConnectionRequest.validateRequests(fromUserId, toUserId, status)

        const userConnection = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await userConnection.save()

        res.status(200).json({
            message: "Connection Request sent Successfully!",
            data
        })

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})

export default connectionRequestRouter


/* EDGE CASES TO BE CONDIDER WHILE MAKING CONNECTION REQUESTS:

i.   No one should send the connection request to the same person more than once.

ii.  The person(User B) who recived the connection request from User A, should be not able to send the
     connection request to User A as request already exist.

iii. The User id should not be invalid.   

iv. Status should not be other than liked and disliked.
*/