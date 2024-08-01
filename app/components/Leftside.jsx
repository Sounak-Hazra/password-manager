"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Zoom } from 'react-toastify';

const Leftside = (props) => {

    const pathname = usePathname()

    const handlelogout = async () => {
        const responce = await fetch("/api/user/logout", {
            method: "GET",
        })
        const finalresponce = await responce.json()
        if (finalresponce.success) {
            window.location.href = "/login"
            return new Promise((resolve, reject) => {
                resolve()
            })
        }
        else {
            return new Promise((resolve, reject) => {
                reject()
            })
        }
          
    }
    const notify = () => toast.promise(handlelogout, {
        pending: "Logouting",
        success: "User Logout Successfully",
        error: "Something Wrong"
    })
    const gosavedpasswords = () => toast.promise(handlelogout, {
        pending: "Logouting",
        error: "Something Wrong"
    })
    const gohome = () => toast.promise(handlelogout, {
        pending: "Logouting",
        error: "Something Wrong"
    })

    return (
        <>
            <div className=' w-full h-full flex justify-end items-stretch bg-white'>
                <button onClick={props.handleHambarger} className='absolute right-2 top-2 md:hidden inline-block'><img src={"/left.svg"} alt="" /></button>
                <div className='min-w-48  h-full   py-14 px-2 items-stretch flex flex-col'>
                    <ul className='w-full flex flex-col gap-2'> 
                        <li className='w-full'>
                            <div className={` ${pathname == "/passwordmanager/home" ? "active" : ""} p-4 flex w-full gap-2 items-center `}>
                                <img className='w-7' src="/home.svg" alt="" />
                                <Link href={"/passwordmanager/home"} className='font-bold  text-xl'>Home</Link>
                            </div>
                        </li>
                        <li className='w-full'>
                            <div className={` ${pathname == "/passwordmanager/savedpasswords" ? "active" : ""} p-4 flex w-full gap-2 items-center `}>
                                <img className='w-7' src="/password.svg" alt="" />
                                <Link href={"/passwordmanager/savedpasswords"} className='font-bold  text-xl'>Saved Passwords</Link>
                            </div>
                        </li>
                        
                    </ul>
                    <div className='w-full mt-auto'>
                            <div className={` ${pathname == "" ? "active" : ""} p-4 flex w-full gap-2 items-center `}>
                                <img className='w-7' src="/logout.svg" alt="" />
                                <button onClick={notify} className='font-bold  text-xl'>Log out</button>
                            </div>
                        </div>
                </div>
            </div>
        </>
  )
}

export default Leftside