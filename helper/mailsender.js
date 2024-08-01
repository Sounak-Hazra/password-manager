import nodemailer from "nodemailer"
import User from "@/models/usermodle"
import bcryptjs from "bcryptjs"
import {v4 } from 'uuid';

export const sendMail = async ({ email, emailType, username }) => {
    try {
        console.log(username)
        const hashedtoken = v4()
        
        if (emailType == "VERIFY") {
            const user = await User.findOneAndUpdate({username:username}, {
                isverifiedtoken: hashedtoken,
                isverifiedtokenexpiry: Date.now() + 3600000
            })
            console.log("this is user "+user)
        } else if (emailType == "RESET") {
            await User.findOneAndUpdate(username, {
                forgotPasswordToken: hashedtoken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "64eaed55045eaa",
                pass: "3c19f7737015c1"
            }
        });
        const info = await transporter.sendMail({
            from: 'hazrasounak87@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Change password",
            html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail/?token=${hashedtoken}>here</a> to ${emailType === "VERIFY" ? "Verify email" : "Reset your passwors"
                } or copy and past the link bellow in the browser 
                <br />
                 ${process.env.DOMAIN}/verifyemail/?token=${hashedtoken}</p>`, // html body
        });
        return info
    } catch (error) {
        throw new Error(error)
    }
}


