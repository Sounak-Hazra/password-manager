import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname
    const publicpath = path === "/login" || path === "/singup" || path === "/verifyemail"
    const token = request.cookies.get("token") ? request.cookies.get("token").value : null
    console.log(path)

    if (path === "/") {
        return NextResponse.redirect(new URL('/passwordmanager/home', request.url))
    }
    if (!token && !publicpath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (token && publicpath) {
        return NextResponse.redirect(new URL('/passwordmanager/home', request.url))
    }
}
 
export const config = {
    matcher: [
        '/',
        "/login",
        "/singup",
        "/verifyemail",
        "/passwordmanager/:path*"
      
  ],
}