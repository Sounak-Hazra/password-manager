"use client"
import React, { useState } from 'react'
import { Inter } from "next/font/google";
import "./../globals.css";
import Leftside from "../components/Leftside";
import VerticalLine from "../components/VerticalLine";
import { ToastContainer, toast, Zoom } from 'react-toastify';

const Wraproot = (props) => {
    const [hambarger, sethambarger] = useState(false)

    const handleHambarger = () => {
        sethambarger(!hambarger)
    }
    return (
        <>

            <ToastContainer position="top-center" transition={Zoom} />
            <main className='w-screen h-fit md:h-screen flex '>
                <section className={`md:w-[25%] w-fit z-10 md:border-[0px] duration-1000 transition-all ease-in-out border-gray-400 border-[1px] md:relative md:left-0 absolute top-0 ${hambarger ? "left-0" : "left-[-100%]"}  md:h-full h-[100vh] `}> <Leftside handleHambarger={handleHambarger} /> </section>
                <VerticalLine />
                <button onClick={handleHambarger} className=' absolute  w-fit h-auto top-[20px] left-48'><img className='w-5 h-5 text-white' src="/hambarger.svg" alt="" /></button>
                <section className='md:w-[50%] W-[100%] md:h-auto h-fit mb-2'>
                    {props.data}
                </section>
                <VerticalLine />
                <section className='w-[25%]  border-yellow-300 h-full'></section>
            </main>


        </>
    )
}

export default Wraproot