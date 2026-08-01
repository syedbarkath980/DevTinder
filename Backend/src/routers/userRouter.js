import mongoose from "mongoose"
import express, { request } from "express"
import userAuth from "../middlewares/userAuth.js"
import ConnectionRequest from "../models/connectionReq.js"
import User from "../models/user.js"


const userRouter = express.Router()


userRouter.get("/feed",
    userAuth,
    async (req, res) => {
        try {

            const loggedInUser = req.user

            // PAGINATION:
            const page = parseInt(request.query.page) || 1
            const limit = parseInt(request.query.limit) || 10
            limit = limit > 50 ? 50 : limit
            const skip = (page - 1) * limit


            // All UsersID from the DB:
            const allUserIDs = await User.find({}, "_id")
            

            // Get the UserIDs to be hidden in feed:
            const usersWithFilters = await ConnectionRequest.find({
                $or: [
                    { fromUserId: loggedInUser._id, status: "accept" },
                    { toUserId: loggedInUser._id, status: "accept" },
                    { status: "liked" },
                    { status: "disliked" }
                ]
            }).populate("fromUserId", "_id")
                .populate("toUserId", "_id");
            
            
            // removes unwanted loggedIn user information:
            const userIDsToBeHiddenInFeed = usersWithFilters.map((row) => {
                if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                    return row.toUserId;
                }
                
                return row.fromUserId
            })

            
            // feedUserIDs: allUserIDs - userIDstoBeHiddenInFeed

            // build a Set of stringified hidden ids for O(1) lookup:
            const hiddenIdSet = new Set(
                userIDsToBeHiddenInFeed.map((hidden) => hidden._id.toString())
            )

            // feedUserIDs: allUserIDs - userIDsToBeHiddenInFeed, using Set for O(1) lookup:
            const feedUserIDs = allUserIDs.filter((row) => {
                return !hiddenIdSet.has(row._id.toString())
            })
            
            // find user's fistName, lastName with the list of userIds:
            const feedUsers = await User.find({
                _id: { $in: feedUserIDs, $ne : loggedInUser._id }
            }).select("firstName lastName").skip(skip).limit(limit)

        
            res.status(200).json({
                message: "FEED USERS ARE :",
                data : feedUsers
            })


        } catch (error) {
            res.status(400).send("ERROR: " + error.message)
        }
    }
 )


export default userRouter


/* 
How FEED should be displayed for a particular USER (Ex: UserA):

i.    UserA's profile should not be shown in feed.
ii.   Profiles who are already 'connected/accepted' should not be shown in feed.
iii.  Profiles 'liked' once by UserA should not be shown in the feed.
iii.  Profiles that are 'disliked' by UserA should not be shown in feed.

ADV:
iv.   Once a Profile is shown to UserA should not be shown again to UserA.

*/


// PLAN:
// 1. Get all the Users's ID from DB

// 2. do hiddenUsers - Get all the users
//    i.  hiddenUsers = "or" queries --> hidden Users's from and To IDs
//   ii.  get required data only (no presence of loggedin user in the hidden users).

// 3. RequiredData = userIDs in the form of ObjectID of the hidden Users

// 4. feedUserIds = From all users ObjectIds subtract RequiredData ObjectIds

// 5. fetch the user details from the feedUserIds

// 6. Show the feed.


/* THIS CODE HAS TWO LOOPS O(n x m) TC:

i.   .map()
ii.  .some()

const feedUserIDs = allUserIDs.filter((row) => {
    if (!userIDsToBeHiddenInFeed.some((hidden) => hidden._id.toString() === row._id.toString())) {
        return row._id
    }
})

- SET is used to O(1) lookup, reducing the TC to O(n + m)
*/


/* Feed Paginition:

/feed?page=1&limit = 10  --> 0 to 10     ==> skip(0), limit(10)
/feed?page=2&limit = 10  --> 11 to 20    ==> skip(10), limit(10)
/feed?page=3&limit = 10  --> 21 to 30    ==> skip(20), limit(10)


skip() = No. of Docs to Skip 
limit() = No. of Docs from DB

skip = (page - 1) * limit

*/