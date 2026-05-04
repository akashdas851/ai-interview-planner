const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true, // Allow all origins for now
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* Health check endpoint */
app.get("/", (req, res) => {
    res.json({ message: "Backend is running", status: "ok" })
})

app.get("/api/health", (req, res) => {
    res.json({ message: "API is healthy", status: "ok" })
})

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app