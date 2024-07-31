import connect from "@/dbconfig/dbconfig";
import User from "@/models/usermodle";
import { NextResponse } from "next/server";
import { getid } from "@/helper/getVsluefromtoken";
import mongoose from "mongoose";

connect()

export async function DELETE(request) {
    try {
        const reqbody = await request.json()
        const { appid } = reqbody
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

        const deletedArr = arr.filter(e => e.id != appid)
        console.log(deletedArr)
        const update = { savedpasswords: deletedArr }
        const updateUser = await User.findByIdAndUpdate(objectid, update)
        if (!updateUser) {
            return NextResponse.json({
                error: "Something wrong that no user found",
                success:false
            },{status:400})
        }
        return NextResponse.json({
            message: "User updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            error: error.message,
            success:false
        },{status : 500})
    }
}