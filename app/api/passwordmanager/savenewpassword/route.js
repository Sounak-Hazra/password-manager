import User from "@/models/usermodle";
import jwt from "jsonwebtoken"
import connect from "@/dbconfig/dbconfig";
import { getid } from "@/helper/getVsluefromtoken";
import { NextResponse } from "next/server";
import { v4 } from "uuid";
import mongoose from "mongoose";


connect()

export async function POST(request) {
    try {
        
        const reqbody = await request.json()
        let { newapp, password, externaldetails } = reqbody
        if (!newapp) {
            return NextResponse.json({
                error: "App name must require ",
                success:false
            },{status:400})
        }
        if (!password) {
            return NextResponse.json({
                error: "Password must require ",
                success:false
            },{status:400})
        }
        
        externaldetails ? externaldetails = externaldetails : externaldetails = "No external details"
        const id = v4()
        const data = await getid(request)
        const objectid = new mongoose.Types.ObjectId(data.id)
        const user = await User.findById(objectid)
        if (!user) {
            return NextResponse.json({
                error: "Something wrong that no user found",
                success:false
            },{status:400})
        }
        const newData = {
            id: id,
            appname: newapp,
            password: password,
            externaldetails :externaldetails
        }
        console.log(user)
        console.log("this is save password"+user.savedpasswords)
        user.savedpasswords.push(newData)

        const saveUser = await user.save()

        return NextResponse.json({
            message: "User saved successfully",
            success:true
        },)
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error:error.message,success:false
        },{status:500})
    }
}