import mongoose, { trusted } from "mongoose"
import User from "./user"
const { Schema } = mongoose

const connectionRequestSchema = new Schema({
    fromUserId: {
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId: {
        type : mongoose.Schema.Types.ObjectId
    },
    status: {
        type : String,
        enum: {
            values: ["liked", "disliked"],
            message : `{VALUES} is not valid status`
        },
        required : true
    }
})  


connectionRequestSchema.statics.validateRequests = async function (fromUserId, toUserId, status) {

    // 1. Check status (optional since enum exists)
    const ALLOWED_STATUS = ["liked", "disliked"]
    if (!ALLOWED_STATUS.includes(status)) {
        throw new Error("Invalid Status Type")
    }

    // 2. Prevent self request
    if (fromUserId.toString() === toUserId.toString()) {
        throw new Error("Cannot send request to yourself")
    }

    // 3. Check if user exists
    const toUser = await User.findById(toUserId)
    if (!toUser) {
        throw new Error("User does not exist")
    }
}

connectionRequestSchema.pre("save", async function (next) {
    try {
        const existingRequest = await mongoose
            .model("ConnectionRequest")
            .findOne({
                $or: [
                    {
                        fromUserId: this.fromUserId,
                        toUserId: this.toUserId
                    },
                    {
                        fromUserId: this.toUserId,
                        toUserId: this.fromUserId
                    }
                ]
            })

        if (existingRequest) {
            return next(new Error("Connection Request Already Exists"))
        }

        next()
    } catch (err) {
        next(err)
    }
})


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)

export default ConnectionRequest;