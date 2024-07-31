import { useState } from "react";
import { useForm } from "react-hook-form"
import { ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Addnewpassword() {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm()
    const [showPass, setshowPass] = useState(false)


    const onSubmit = async (data) => {
        const senddata = await fetch("/api/passwordmanager/savenewpassword", {
            method: "POST",
            body: JSON.stringify(data),
        })
        const returndata = await senddata.json()
        if (returndata.success) {
            // alert(returndata.message)
            reset()
        }
        else {
            // alert(returndata.error)
            return new Promise((rs, re) => {
                re()
            })
        }
    }
    const notify = (data) => toast.promise(onSubmit(data), {
        pending: "Waiting for Save User",
        success: "User Saved successfully",
        error: "Failed to Save User"
    })
    const showpass = () => {
        setshowPass(!showPass)
    }

    return (
        <form onSubmit={handleSubmit(notify)} className="w-full max-h-70 justify-center flex flex-col ">
            <div className=" gap-8 flex items-center p-3 relative">
                <label className="font-bold text-base w-[110px] h-5 "><span className="my-auto">UserName</span></label>
                <input className="w-full border-[1px] p-2 rounded-sm border-black" defaultValue="" placeholder="email" {...register("newapp", {
                    required: { value: true, message: "Email must be reqired" },
                })} />
                {errors.newapp && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-8px]' >{errors.newapp.message}</span>}
            </div>

            <div className=" gap-8 flex items-center relative p-3">
                <img onClick={showpass} className="absolute right-[-14px]" src={showPass ? "/closedeye.svg" :"/eye.svg"} alt="" />
                <label className="font-bold text-base w-[110px] h-5 "><span className="my-auto">Password</span></label>
                <input type={showPass ? "text" : "password"} className="w-full border-[1px] p-2 rounded-sm border-black" defaultValue="" placeholder="password" {...register("password", {
                    required: { value: true, message: "Password must be required" },
                })} />
                {errors.password && <span className='absolute w-fit text-[10px] text-red-600 bottom-[-8px]' >{errors.password.message}</span>}
            </div>
            <div className=" gap-8 flex items-center p-3">
                <label className="self-start font-bold text-base w-[110px] h-5 "><span className="">External details</span></label>
                <textarea type="text" className="w-full border-[1px] p-2 h-36 rounded-sm border-black" defaultValue=""  {...register("externaldetails")} />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}


            <input className={isSubmitting ? "hidden" : "bg-green-800  w-fit self-center p-2 rounded-sm font-bold text-white cursor-pointer"} type="submit" />
            <div className= {isSubmitting ? "bg-green-800  w-fit self-center p-2 rounded-sm font-bold text-white cursor-pointer" : "hidden"}>Submiting in process...</div>
        </form>
    )
}