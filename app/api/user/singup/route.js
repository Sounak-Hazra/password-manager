import User from "@/models/usermodle";
import connect from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helper/mailsender";

connect()
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const {username,email,password} = reqbody
        const user = await User.findOne({ email:email })
        if (user) {
            return NextResponse.json({error:"User alredy exist",success:false},{status:400})
        }
        const hash = await bcryptjs.hash(password, 10)
        const createuser = await User.create({
            username: username,
            email: email,
            password: hash,
        })
        console.log(createuser)
        const mailsender = sendMail({ email: email, emailType: "VERIFY", username: username })
        // console.log(mailsender)
        return NextResponse.json({
            message: "Mail send successfully",
            success:true,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Network connection error",message:error.message,success:false},{status:500})
    }
}