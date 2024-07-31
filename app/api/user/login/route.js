import User from "@/models/usermodle";
import connect from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(request) {

    try {
        const reqbody = await request.json()
        const { email, password } = reqbody
        const user = await User.findOne({ email: email })
        if (!user) {
            return NextResponse.json({ error: "No user found with this email", success: false }, { status: 400 })
            
        }

        const checkpassword = await bcryptjs.compare(password,user.password)
        if (!checkpassword) {
            return NextResponse.json({error:"Invalid password",success:false},{status:400})
        }
        const tokendata = {
            id: user._id,
            username: user.username,
            email:user.email
        }
        const cookie = jwt.sign(tokendata, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        
        const responce = NextResponse.json({ message: "User login successfully", success: true },)
        responce.cookies.set("token", cookie, {
            httpOnly:true
        })
        return responce
    } catch (error) {
        return NextResponse.json({error:error.message,success:false},{status:500})
    }
    
}