import User from "@/models/usermodle";
import { NextResponse } from "next/server";
import { getid } from "@/helper/getVsluefromtoken";
import mongoose from "mongoose";
import connect from "@/dbconfig/dbconfig";

connect()

export async function GET(request) {
    try {
        const data = await getid(request)
        const objectid = new mongoose.Types.ObjectId(data.id)
        const user = await User.findById(objectid)
        if (!user) {
            return NextResponse.json({
                error: "Something wrong that no user found",
                success:false
            },{status:400})
        }
        const arr = user.savedpasswords
        return NextResponse.json({
            data:arr,success:true
        })
    } catch (error) {
        return NextResponse.json({
            error:error.message,success:false
        }, {status:500})
    }
}