import express from "express"
import userAuth from "../middlewares/userAuth.js"
import ConnectionRequest from "../models/connectionReq.js"

const connectionReviewRouter = express.Router()

const SAFE_DATA_DISPLAY = "firstName lastName age gender photoUrl skills"

// Router for reviewing all the received requests to be accpeted or rejected
connectionReviewRouter.get("/user/connectionRequests",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user

            const connectionRequests = await ConnectionRequest.find({
                toUserId: loggedInUser._id,
                status: "liked"
            }).populate("fromUserId", SAFE_DATA_DISPLAY)

            if (!connectionRequests) {
                throw new Error("No requests exists...")
            }

            res.status(200).json({
                message: "Connection Requests are: ",
                datda: connectionRequests
            })

        } catch (error) {
            res.status(400).send("ERROR :" + error.message)
        }
})


connectionReviewRouter.get("/user/myConnections",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user

            const myConnections = await ConnectionRequest.find({
                $or: [
                    { fromUserId: loggedInUser._id, status: "accept" },
                    { toUserId: loggedInUser._id, status: "accept" }
                ]
            })
            .populate("fromUserId", SAFE_DATA_DISPLAY)
            .populate("toUserId", SAFE_DATA_DISPLAY);
            

            if (!myConnections) {
                throw new Error("No Connections Exists...")
            }

            const connectionsData = myConnections.map((row) => { 
                // agar logged in user hi fromUserId hai, send toUserId details.
                if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return row.toUserId;
                }
                return row.fromUserId
            })

            res.status(200).json({
                message: "My Connections are: ",
                data : connectionsData    
            })

        } catch (error) {
            res.status(400).send("ERROR :" + error.message)
        }
})


export default connectionReviewRouter

// In the above connectionRequests how will i get the names of the users who sent the requests?

// 1. Loop on conncetionRequests then find out the name using from UserID (Poor way)
// 2. Make a reference/link/relation between two collections using 'ref : collection_name' and use populate().