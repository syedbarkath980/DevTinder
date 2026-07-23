import mongoose from "mongoose";
import validator from "validator"
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
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Invalid email format")
            }
        },
        trim : true
    },
    password: {
        type: String,
        min: 8,
        validate(password) {
            if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })) {
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
            if (!validator.isIn(gender.toLowerCase(), ["male", "female", "other"])) {
                throw new Error("Invalid Gender")
            }
        }
    },
    photoUrl: {
        type: String,
        trim : true,
        validate(photoUrl) {
            if (photoUrl && !validator.isURL(photoUrl)) {
                throw new Error("Invalid Photo URL")
            }
        },
        default : "https://img.magnific.com/premium-photo/cute-cartoon-robot-with-pastel-colors-happy-face_14117-791753.jpg?w=360"
    },
    skills: {
        type : [String],
        validate(skills) {
            if (skills.length > 10) {
                throw new Error("Skills cannot be more than 10")
            }
        }
    }
}, { timestamps: true })

const User = mongoose.model("Users", userSchema)

export default User