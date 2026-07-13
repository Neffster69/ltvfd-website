"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import PublicSiteLayout from "@/components/PublicSiteLayout"

export default function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (data: Record<string, unknown>) => {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            setSubmitted(true)
            reset()
        }
    }

    return (
        <PublicSiteLayout
            title="Contact"
            description="For emergencies, call 911. For non-emergency questions, station communications, or community outreach, use the information below or send us a message."
        >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-red-600">Emergency Notice</h2>
                        <p className="text-gray-700">If you are experiencing an emergency or need immediate fire or medical assistance, please call 911 immediately. Do not use this form for emergency requests.</p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-red-600">Station Contact Details</h2>
                        <ul className="space-y-3 text-gray-700">
                            <li><span className="font-semibold">Phone:</span> (765) 393-0249</li>
                            <li><span className="font-semibold">Email:</span> <a href="mailto:ltvfd30admin@gmail.com" className="text-red-600 hover:text-red-800">ltvfd30admin@gmail.com</a></li>
                            <li><span className="font-semibold">Facebook:</span> <a href="https://www.facebook.com/lafayettetownshipfire" target="_blank" rel="noreferrer" className="text-red-600 hover:text-red-800">Lafayette Township Fire Department</a></li>
                            <li><span className="font-semibold">Address:</span> 3235 N 100 W, Anderson, IN 46011</li>
                            <li><span className="font-semibold">Office Hours:</span> Monday-Friday, 8:00 a.m. - 5:00 p.m.</li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-2xl font-bold text-red-600">Send a Message</h2>
                    <p className="mb-6 text-gray-600">Questions about events, station access, or volunteer opportunities can be sent here. Submissions are sent to our admin inbox at <a href="mailto:ltvfd30admin@gmail.com" className="text-red-600 hover:text-red-800">ltvfd30admin@gmail.com</a>.</p>
                    {submitted ? (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                            Thank you for your message. We will get back to you soon.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-gray-700">Name</label>
                                <input {...register("name", { required: true })} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" />
                                {errors.name && <p className="mt-1 text-sm text-red-500">Name is required</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
                                <input {...register("email", { required: true })} type="email" className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" />
                                {errors.email && <p className="mt-1 text-sm text-red-500">Email is required</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-gray-700">Message</label>
                                <textarea {...register("message", { required: true })} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" rows={5}></textarea>
                                {errors.message && <p className="mt-1 text-sm text-red-500">Message is required</p>}
                            </div>
                            <button type="submit" className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700">Send Message</button>
                        </form>
                    )}
                </div>
            </div>
        </PublicSiteLayout>
    )
}