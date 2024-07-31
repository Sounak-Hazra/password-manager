"use client"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const page = () => {
    const searchParams = useSearchParams()
    const tokenValue = searchParams.get('token')


    const handleClick = async () => {
        const response = await fetch("/api/user/verifyemail", {
            method: "POST",
            body: JSON.stringify({ verifytoken: tokenValue }),
        })
        const finaldata = await response.json()
        if (finaldata.success) {
            alert("Verification successfull")
            window.location.href = "/login"
        }
    }

    return (
        <>
            <Suspense>
            <div className='w-screen h-screen flex items-center justify-center'>
                <button onClick={handleClick} className='w-fit h-fit px-5 py-2 bg-green-500 rounded-sm font-bold text-white'>VERIFY</button>
                </div>
                </Suspense>
        </>
    )
}

export default page