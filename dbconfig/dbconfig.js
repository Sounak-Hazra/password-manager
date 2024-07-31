import mongoose from "mongoose";

export default function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connected = mongoose.connection
        connected.on("connected", () => {
            console.log("mongodb connection successfully")
        })
        connected.on("error", () => {
            console.log("Mongo db connection failed")
        })

    } catch (error) {
        console.log("something went wrong"+ error.message)
    }
}