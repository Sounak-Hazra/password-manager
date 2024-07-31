"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'


const Nav = () => {
    const [username, setusername] = useState("Username")
    const getUserid = async () => {
        const data = await fetch("/api/user/senduserid", {
            method:"GET"
        })
        const finalData = await data.json()
        setusername(finalData.data)
    }
    useEffect(() => {
      getUserid()
    }, [])
    
    return (
        <>
            <nav className='w-full h-14 bg-green-800 flex justify-between items-center p-2 '> 
                <div className="logo text-white font-extrabold text-lg  md:text-2xl">
                    Password-Manager
                </div>
                <div className="options">
                    <ul className='flex gap-4 text-white font-bold'>
                        <li className='rounded-md flex gap-1 justify-center items-center p-1 cursor-pointer '>
                            <img className='invert-1 w-5 md:w-fit' src="/user.svg" alt="" />
                            <span className='text-xs md:text-lg'>{username}</span></li>
                    </ul>
                </div>
            </nav>
        </>
  )
}

export default Nav