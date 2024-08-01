"use client"
import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link';

const page = () => {
  const { register, handleSubmit, watch, formState: { errors, isDirty, isSubmitting } } = useForm();
  const [err, seterr] = useState("")
  const [color, setcolor] = useState(false)

  const delay = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 5000);
    })
  }
  const onSubmit = async (data) => {
    const responce = await fetch("/api/user/singup", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const finaldata = await responce.json()
    if (finaldata.success) {
      seterr("We sent a email on your email please verify it and login !")
      setcolor(true)
    }
    else {
      seterr(finaldata.error)
      setcolor(false)
    }
  };
  
  

  return (
    <>
      <div className='h-screen bg-gray-300 flex items-center justify-center'>
        <form className=' h-fit flex flex-col relative gap-4' onSubmit={handleSubmit(onSubmit)}>
          <label className='border relative border-gray-500 justify-between flex gap-2 flex-col md:flex-row md:items-center items-start p-2 bg-black text-white font-bold rounded-sm' htmlFor="username">
            User Name :
            <input placeholder='username' className='text-black border font-semibold  border-gray-500 p-1 rounded-md' {...register("username", {
          required: { value: true, message: "username must be reqired" },
          minLength: { value: 3, message: "Min length is 3" },
          maxLength: { value: 8, message: "Max length is 8" }
        })} />
            {errors.username && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-16px] ' >{
            errors.username.message}</span>}
            {err && <span className={`absolute w-fit text-base ${color ? "text-green-600" : "text-red-600"} md:bottom-[64px] bottom-[84px] `} >{
            err }</span>}
          </label>
          <label className='border relative border-gray-500 justify-between flex gap-2 flex-col md:flex-row md:items-center items-start p-2 bg-black text-white font-bold rounded-sm' htmlFor="username">
            Email :
            <input placeholder='email' className='text-black font-semibold border border-gray-500 p-1 rounded-md' {...register("email", {
          required: { value: true, message: "Email must be reqired" },
          minLength: { value: 3, message: "Min length is 3" } })} />
            {errors.email && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-16px]' >{errors.email.message}</span>}
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
          <div className='flex items-center justify-center text-blue-500 text-sm font-bold'><Link href="/login">Alredy have an account ?</Link></div>
        </form>
      </div>
    </>
  );
}
export default page