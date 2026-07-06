"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const router = useRouter()

    const onSubmit = async (data: Record<string, unknown>) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })
        if (result?.error) {
            setError("Invalid credentials")
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Employee Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block">Email</label>
                    <input {...register("email", { required: true })} type="email" className="w-full p-2 border" />
                    {errors.email && <p className="text-red-500">Email required</p>}
                </div>
                <div className="mb-4">
                    <label className="block">Password</label>
                    <input {...register("password", { required: true })} type="password" className="w-full p-2 border" />
                    {errors.password && <p className="text-red-500">Password required</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>
        </div>
    )
}