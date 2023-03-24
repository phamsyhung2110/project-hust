const express = require("express")
const { default: mongoose } = require("mongoose")
// var bodyParser = require('body-parser')
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const homeRoute = require("./routes/home")


const app = express()

dotenv.config()


mongoose.connect("mongodb://127.0.0.1:27017/ecomere", { useNewUrlParser: true })
.then(()=>{console.log("Connected to DB")})
.catch((err) => {
    console.log(err)
})
app.get("/api/test", () => {
    console.log("Tested")
})

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use("/", homeRoute)
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

// app.use(express.json)
app.listen(process.env.PORT || 5000, () => {
    console.log("App is running!" )
})