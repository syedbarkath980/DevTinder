// SERVER:
const express = require("express")
const app = express()



app.use("/", (req, res) => {
    res.end("Hello from the Dashboard!")  // Request handler.
})

app.use("/test", (req, res) => {
    res.end("Hello from the Test!")   // Request handler.
})

// Listening on port 3000...
app.listen(3000, () => {
    console.log("Server Up and Running on Port 3000...")
})