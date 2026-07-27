import mongoose from "mongoose"
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
        }
    }
})


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)

export default ConnectionRequest;