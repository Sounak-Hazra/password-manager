import connect from "@/dbconfig/dbconfig";
import User from "@/models/usermodle";
import { NextResponse } from "next/server";


connect()

export async function POST(request) {
    try {
        
        const reqbody = await request.json()
        const { verifytoken } = reqbody
        const user = await User.findOne({ isverifiedtoken: verifytoken, isverifiedtokenexpiry: {$gt : Date.now()} })
        console.log(user)
        if (!user) {
            return NextResponse.json({
                error:"wrong user email"
            },{status:400})
        }
        user.isverified = true
        user.isverifiedtoken = undefined
        user.isverifiedtokenexpiry = undefined
        const saveUser = await user.save()
        return NextResponse.json({message:"user verification successfull",success:true})

    } catch (error) {
        return NextResponse.json({
            message: "some error occured",
            success:false
        }, {
            status:500
        })
    }
    
}