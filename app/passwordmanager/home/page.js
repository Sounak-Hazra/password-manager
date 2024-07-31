"use client"
import React from 'react'
import Nav from '../../components/Nav'
import Addnewpassword from '@/app/components/Addnewpassword'

const page = () => {
    return (
        <>
            <Nav />
            
            <div className=' my-7 md:px-7 px-2'>
                <div className=' md:px-3 flex flex-col'>
                    <div className='self-center text-lg bg-green-800 p-2 my-5 rounded-sm font-bold text-white'>Add New Password</div>
                    <Addnewpassword />
                    </div>
            </div>
            <div className='md:px-7 px-2 md:mb-0 mb-4'>
                <div className='bg-yellow-200 md:px-3 p-2 mb-28 '>
                    Note : Your privacy and security are our top priorities. Our password manager uses advanced encryption to ensure that your passwords and sensitive information are kept safe. We employ strong AES-256 encryption to protect your data both at rest and in transit.
                    To further safeguard your information, our app features multi-factor authentication (MFA), which adds an extra layer of protection. Our design ensures that your data remains confidential, and we do not have access to your master password or any of your stored information.
                    Regular updates and security reviews are conducted to address potential vulnerabilities and enhance protection. For optimal security, we recommend using unique passwords for each of your accounts and enabling MFA wherever possible.
                    Thank you for trusting us with your digital security.
                </div>
            </div>
        </>
    )
}

export default page