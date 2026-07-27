const validateData = (req) => {
    
    const ALLOWED_MINSIGNUP_FIELDS = ["firstName", "lastName", "email", "password"]
    const isValidSignup = Object.keys(req.body).every((key) => ALLOWED_MINSIGNUP_FIELDS.includes(key))

    if (!isValidSignup) {
        throw new Error("INVALID SIGNUP DATA")
    }    

}

const isUpdatesAllowed = (data) => {
     const ALLOWED_UPDATES =
        ["firstName", "lastName", "gender", "photoUrl", "skills"]  // No E-MAIL and AGE
            
        
    const isValidUpdates = (Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key)))
    
    if (!isValidUpdates) {
        throw new Error("Error Updating data...")
    }
}


export {validateData, isUpdatesAllowed}