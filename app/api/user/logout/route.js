import connect from "@/dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";


connect()

export async function GET(request) {
    try {
        const responce = NextResponse.json({ message: "Log out successfully", success: true })
        responce.cookies.set("token", "", {
            httpOnly: true,
            expires:new Date(0)
        })
        return responce
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.massage ,success:false}, { status: 500 })
    }
}