const validateData = (req) => {
    
    const ALLOWED_MINSIGNUP_FIELDS = ["firstName", "lastName", "email", "password"]
    const isValidSignup = Object.keys(req.body).every((key) => ALLOWED_MINSIGNUP_FIELDS.includes(key))

    if (!isValidSignup) {
        throw new Error("INVALID SIGNUP DATA")
    }    

}

export default validateData