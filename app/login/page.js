"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link';
import VerticalLine from "../components/VerticalLine";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import "../globals.css"

const page = () => {
  const { register, handleSubmit, watch, formState: { errors, isDirty, isSubmitting } } = useForm();
  const [err, seterr] = useState("")

  const onSubmit = async (data) => {
    const responce = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
    
    const finaldata = await responce.json()
    if (finaldata.success) {
      window.location.href = "/passwordmanager/home"
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
    else {
      if (finaldata.error === "No user found with this email") {
        seterr("Network connection error")
      }
      else if (finaldata.error === "Invalid password") {
        seterr("Invalid password")
      }
      else {
        
        seterr("Network contraction error")
      }
      return new Promise((resolve, reject) => {
        reject()
      })
    }
    
    
  };
  const notify = (data) => toast.promise(onSubmit(data), {
    pending: "Logining User",
    success: "User Login Successfully",
    error: "Something Wrong"
})
  return (
    <>
      <div className='h-screen bg-gray-300 flex items-center justify-center'>
        <form className=' h-fit flex flex-col relative gap-4' onSubmit={handleSubmit( notify )}>
          <label className='border relative border-gray-500 justify-between flex gap-2 flex-col md:flex-row md:items-center items-start p-2 bg-black text-white font-bold rounded-sm' htmlFor="username">
            Email :
            <input placeholder='email' className='text-black font-semibold border border-gray-500 p-1 rounded-md' {...register("email", {
          required: { value: true, message: "Email must be reqired" },
          minLength: { value: 3, message: "Min length is 3" } })} />
            {errors.email && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-16px]' >{errors.email.message}</span>}
            {err && <span className='absolute w-fit text-[10px] text-red-600 bottom-[84px] md:bottom-[64px]' >{err}</span>}
          </label>
          <label className='border relative border-gray-500 justify-between flex gap-2 flex-col md:flex-row md:items-center items-start p-2 bg-black text-white font-bold rounded-sm' htmlFor="username">
            Password :
            <input placeholder='password' className='text-black font-semibold border border-gray-500 p-1 rounded-md' {...register("password", {
              required: { value: true, message: "Password must be reqired" },
              minLength: { value: 3, message: "Min length is 3" } })
            } />
            {errors.password && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-16px]' >{errors.password.message}</span>}
            
          </label>

          <input className={!isDirty || isSubmitting ? 'bg-gray-300 border border-black shadow-md w-fit self-center p-2 rounded-md font-bold' : "bg-yellow-400 w-fit border-black border self-center p-2 rounded-md font-bold"} disabled={!isDirty || isSubmitting} type="submit" />
          <div className='flex items-center justify-center text-blue-500 text-sm font-bold'><Link href="/singup">Create a account</Link></div>
          {/* {err && <span className='absolute w-fit text-[10px] text-red-600 bottom-0' >{err}</span>} */}
        </form>
      </div>
      
    </>
  );
}
export default page