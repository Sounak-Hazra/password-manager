import jwt from "jsonwebtoken"


export async function getid(request) {

    try {
        const cookies = request.cookies.get("token") || ""
        console.log(cookies.value)
        const decodedToken =  jwt.verify(cookies.value, process.env.TOKEN_SECRET)
        console.log("this is decoded token " + decodedToken)
        return decodedToken
    } catch (error) {
        throw new Error(error.message)
    }
}