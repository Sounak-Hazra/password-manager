import { NextResponse } from "next/server";
import { getid } from "@/helper/getVsluefromtoken";



export async function GET(request) {
    try {
        const data = await getid(request)
        const id = data.username 
        console.log(data)
        return NextResponse.json({
            data:id,success:true
        })
    } catch (error) {
        return NextResponse.json({
            data:"Username",success:false
        },{status:500})
    }
}