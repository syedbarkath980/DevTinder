import mongoose, { trusted } from "mongoose"
import User from "./user.js"
const { Schema } = mongoose

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Users"  // creates a connection between two collection.
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Users"
    },
    status: {
        type : String,
        enum: {
            values: ["liked", "disliked", "accept", "reject"],
            message : `{VALUES} is not valid status`
        },
        required : true
    }
}, {timestamps : true})  


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

connectionRequestSchema.pre("save", async function () {
    if (!this.isNew) {
        return
    }

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
        throw new Error("Connection Request Already Exists")
    }
})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1})   // compound index

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)

export default ConnectionRequest;