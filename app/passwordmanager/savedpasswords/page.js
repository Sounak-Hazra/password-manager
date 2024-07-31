"use client"
import React from 'react'
import Nav from '@/app/components/Nav'
import { useState, useEffect } from 'react'
import Changepassworddisplay from '@/app/components/Changepassworddisplay'
import { ToastContainer, toast } from 'react-toastify';


const page = () => {
    const [passwords, setpasswords] = useState([])
    const [showpassword, setshowpassword] = useState(true)
    const [makeblur, setmakeblur] = useState(false)
    const [props, setprops] = useState({})
    const [changePasswordpage, setchangePasswordpage] = useState(false)
    const [passwordUpdated, setpasswordUpdated] = useState(true)
    const notify = (e) => toast.promise(handledelete(e), {
        pending: "Waiting for Deleting User",
        success: "User Deleted successfully",
        error: "Failed to Delete User"
    });
    const getPasswords = async () => {
        const responce = await fetch("/api/passwordmanager/senddata", {
            method: "GET",
        })
        const data = await responce.json()
        if (data) {
            setpasswords(data.data)
        }
    }
    const handledelete = async (e) => {
        const data = {appid:e.id}
        const responce = await fetch("/api/passwordmanager/deleteapp", {
            method: "DELETE",
            body:JSON.stringify(data)
        })
        const finalresponce = await responce.json()
        setpasswordUpdated(!passwordUpdated)
        if (finalresponce.success) {
            return new Promise((rs, re) => {
                rs()
            })
        }
        else {
            return new Promise((rs, re) => {
                re()
            })
        }
    }
    useEffect(() => {
        getPasswords()
        console.log(passwords)
    }, [])
    useEffect(() => {
        getPasswords()
    }, [passwordUpdated])
    
    const handleclick = () => {
        setshowpassword(!showpassword)

    }
    const handleEdit = (e) => {
        setmakeblur(!makeblur)
        const newobject = { appname: e.appname, password: e.password, externaldetails: e.externaldetails, appid: e.id }
        setprops(newobject)
        setchangePasswordpage(!changePasswordpage)

    }
    const handleeditorpage = () => {
        setmakeblur(!makeblur)
        setchangePasswordpage(!changePasswordpage)
    }
    
    return (
        <>
            <div className={`h-screen ${makeblur ? "makeblur" : ""} simple-animation`}>
                <Nav />

                <div className=' w-full custom-height p-4'>
                    <div className=' w-full h-full overflow-y-auto mt-4'>
                        <table className=' w-full relative'>
                            <thead className='w-full  '>
                                <tr className=' '>
                                    <th className='text-lg w-[200px] ' scope="col">App name</th>
                                    <th className='text-lg w-fit' scope="col"><div ><span className='mr-2'>Password</span>
                                        <button><img onClick={handleclick} className='w-4' src="/eye.svg" alt="" /></button></div>
                                    </th>
                                    <th className='text-lg ' scope="col">External details</th>
                                    <th className='text-lg '>Delete/Edit</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {passwords.map((e) => {
                                    return <tr key={e.id} className='w-full'>
                                        <td className='text-center w-10 h-12'>
                                            <div className='overflow-y-auto overflow-x-hidden scrollbar-thin h-full'>
                                                <span className='w-[200px] block break-all'>
                                                    {e.appname}
                                                </span>
                                            </div>
                                        </td>

                                        <td className='text-center w-10 h-12 '><div className='overflow-y-auto overflow-x-hidden scrollbar-thin h-full'>
                                            <span className={`${showpassword ? "" : "notshow"} w-[200px] block break-all`}>
                                                {e.password}
                                            </span>
                                        </div></td>
                                        <td className='text-center w-15 h-12 '><div className='overflow-y-auto overflow-x-hidden scrollbar-thin h-full'>
                                            <span className='w-full block break-all'>
                                                {e.externaldetails}
                                            </span>
                                        </div></td>
                                        <td className='text-center w-15 h-12 '><div className='overflow-y-auto overflow-x-hidden scrollbar-thin h-full flex justify-around'>
                                            <button disabled={changePasswordpage} onClick={()=>notify(e)}><img  src="/delete.svg" alt="" /></button>
                                            <button disabled={changePasswordpage} onClick={()=>handleEdit(e)} ><img  src="/edit.svg" alt="" /></button>
                                        </div></td>
                                    </tr>
                                })}

                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={`${changePasswordpage ? "" : "hidden"} bg-white border-[.5px] simple-animation  border-gray-500 absolute absolute-item p-4`}>
               <button onClick={handleeditorpage} > <img src={"/crossicon.svg"} className='absolute top-2 right-2' alt="" /></button>
                <Changepassworddisplay data={props} makeblur={makeblur} setmakeblur={setmakeblur} changePasswordpage={changePasswordpage} setchangePasswordpage={ setchangePasswordpage} passwordUpdated={passwordUpdated} setpasswordUpdated={setpasswordUpdated} />
            </div>
        </>
    )
}

export default page