"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Changepassworddisplay = (props) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
        defaultValues: {
            appname: "",
            password: "",
            externaldetails: ""
        }
    });
    useEffect(() => {
        setValue("appname", props.data.appname)
        setValue("password", props.data.password)
        setValue("externaldetails", props.data.externaldetails)
    }, [props])



    const onSubmit = async (data) => {
        const finalData = { ...data, appid: props.data.appid }
        const responce = await fetch("/api/passwordmanager/updateapp", {
            method: "PUT",
            body: JSON.stringify(finalData),
          })
        const finalresponce = await responce.json()
        if (finalresponce.success) {
            props.setmakeblur(!props.makeblur)
            props.setchangePasswordpage(!props.changePasswordpage)
            props.setpasswordUpdated(!props.passwordUpdated)
            console.log(props.passwordUpdated)
        }
        else {
            return new Promise((r, re) => {
                re()
            })
        }
    }
    const notify = (data) => toast.promise(onSubmit(data), {
        pending: "Waiting for Updating User",
        success: "User Updated successfully",
        error: "Failed to Update User"
    });

    return (
        <form onSubmit={handleSubmit(notify)} className="w-full max-h-70 justify-center flex flex-col ">
            
            
            <div className=" gap-8 flex items-center p-3 relative">
                <label className="font-bold text-base w-[110px] h-5 "><span className="my-auto">UserName</span></label>
                <input className="w-full border-[1px] p-2 rounded-sm border-black"  placeholder="email" {...register("appname", {
                    required: { value: true, message: "Email must be reqired" },
                })} />
                {errors.appname && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-8px]' >{errors.appname.message}</span>}
            </div>

            <div className=" gap-8 flex items-center relative p-3">
                <label className="font-bold text-base w-[110px] h-5 "><span className="my-auto">Password</span></label>
                <input type="password" className="w-full border-[1px] p-2 rounded-sm border-black" placeholder="password" {...register("password", {
                    required: { value: true, message: "Password must be required" },
                })} />
                {errors.password && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-8px]' >{errors.password.message}</span>}
            </div>
            <div className=" gap-8 flex items-center p-3">
                <label className="self-start font-bold text-base w-[110px] h-5 "><span className="">External details</span></label>
                <textarea type="text" className="w-full border-[1px] p-2 h-36 rounded-sm border-black" {...register("externaldetails")} />
            </div>


            <input className={isSubmitting ? "hidden" : "bg-green-800  w-fit self-center p-2 rounded-sm font-bold text-white cursor-pointer"} type="submit" />
            <div className={isSubmitting ? "bg-green-800  w-fit self-center p-2 rounded-sm font-bold text-white cursor-pointer" : "hidden"}>Submiting in process...</div>
        </form>
    )
}

export default Changepassworddisplay