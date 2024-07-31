import connect from "@/dbconfig/dbconfig";
import User from "@/models/usermodle";
import { NextResponse } from "next/server";
import { getid } from "@/helper/getVsluefromtoken";
import mongoose from "mongoose";

connect()

export async function PUT(request) {
    try {
        const reqbody = await request.json()
        const { appid, appname, password, externaldetails } = reqbody
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
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.id === appid) {
                element.appname = appname
                element.password = password
                element.externaldetails = externaldetails
            }
        }
        const update = {savedpasswords : arr}
        const updateApp = await User.findByIdAndUpdate(objectid,update)
        if (!updateApp) {
            return NextResponse.json({
                error:"some problem occured",success: false
            },{status:400})
        }
        return NextResponse.json({
            message:"User updated successfully",success:true
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            error:error.message,success:false
        },{status:500})
    }
}