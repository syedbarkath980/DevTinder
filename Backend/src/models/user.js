import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim : true
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 20,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(email) {   // function for custom validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format")
            }
        },
        trim : true
    },
    password: {
        type: String,
        min: 8,
        validate(password) {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
            if (!passwordRegex.test(password)) {
                throw new Error("Password must have uppercase, lowercase, digit, and be 8+ characters")
            }
        },
        trim : true
    },
    age: {
        type: Number,
        min: 18,
        max : 100,
    },
    gender: {
        type: String,
        validate (gender) {
            if (!["male", "female", "other"].includes(gender.toLowerCase())) {
                throw new Error("Invalid Gender")
            }
        }
    },
    photoUrl: {
        type: String,
        trim : true,
        default : "https://img.magnific.com/premium-photo/cute-cartoon-robot-with-pastel-colors-happy-face_14117-791753.jpg?w=360"
    },
    skills: {
        type : [String]
    }
}, { timestamps: true })

const User = mongoose.model("Users", userSchema)

export default User