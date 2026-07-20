import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect("mongodb://syededu0n1_db_user:Memongodb@ac-pnrsbgi-shard-00-00.9dk1u3u.mongodb.net:27017,ac-pnrsbgi-shard-00-01.9dk1u3u.mongodb.net:27017,ac-pnrsbgi-shard-00-02.9dk1u3u.mongodb.net:27017/DevTinder?ssl=true&replicaSet=atlas-xxwt29-shard-0&authSource=admin&appName=Syed")
}

export default connectDB