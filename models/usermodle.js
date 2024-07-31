import mongoose from 'mongoose';
const { Schema } = mongoose;

const Userschema = new Schema({
    username: {
        type: String,
        require: [true, "Username is must require"],
        unique:[true,"Username should be unique"]
    },
    email: {
        type: String,
        require: [true, "Email is must require"],
        unique:[true,"Email should be unique"]
    },
    password: {
        type: String,
        require: [true, "Email is must require"],
    },
    isverified: {
        type: Boolean,
        default:false
    },
    savedpasswords: {
        type: [],
    },
    isverifiedtoken: String,
    isverifiedtokenexpiry: Date,
    forgotpasswordtoken:String,
    forgotpasswordtokenexpiry:Date,

    
}); 

const User = mongoose.models.users || mongoose.model("users", Userschema)
export default User