import express from "express"
import userAuth from "../middlewares/userAuth.js"
import ConnectionRequest from "../models/connectionReq.js"
import mongoose from "mongoose"
import User from "../models/user.js"


const connectionRequestRouter = express.Router()

connectionRequestRouter.post("/request/send/:status/:toUserid",
    userAuth,
    async (req, res) => {
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
        })

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})

connectionRequestRouter.post("/request/response/:status/:requestId",
    userAuth,
    async (req, res) => {
    try {
        const loggedInUser = req.user
        const { status, requestId } = req.params


        const ALLOWED_STATUS = ["accept", "reject"]

        const validStatus = ALLOWED_STATUS.includes(status)
        if (!validStatus) {
            throw new Error("INVALID STATUS TYPE")
        }

        // it helps in finding the connection requests in the DB based on the specified parameters
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            status: "liked",
            toUserId: loggedInUser._id   // validates that whether the to user id from the connnection is same as the logged in user or not.
        })

        if (!connectionRequest) {
            throw new Error("Invalid Request")
        }

        connectionRequest.status = status

        await connectionRequest.save()
        res.status(200).send(`Request ${status}ed Successfully!`)
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
})

export default connectionRequestRouter;











/* EDGE CASES TO BE CONDIDER WHILE SENDING CONNECTION REQUESTS:

i.   No one should send the connection request to the same person more than once.
ii.  The person(User B) who recived the connection request from User A, should be not able to send the
     connection request to User A as request already exist.
iii. The User id should not be invalid.   
iv. Status should not be other than liked and disliked.
*/


/* EDGE CASES TO BE CONDIDER WHILE REVIEWING CONNECTION REQUESTS:

i.    The user should be logged in!
ii.   The connection status should only be "liked"
iii.  The user who is logged in should only be the user to which "liked" request has sent
        Example: User A ---(liked)--> User B
                User B Should only be the user who will accept/reject the request came in the form of liked.
                User C or User A, Should not be able to "accept" or "reject" User A's request through User B.
iv.   The status from the URL should only be the Acccepted or Rejected
v.    The request id must be valid request id
*/