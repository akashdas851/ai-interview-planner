const mongoose = require("mongoose")



async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("✅ Connected to Database")
    }
    catch (err) {
        console.error("❌ Database Connection Error:", err.message)
        // Don't exit - allow server to continue running even if DB fails
    }
}

module.exports = connectToDB