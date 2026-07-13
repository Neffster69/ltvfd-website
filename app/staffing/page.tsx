"use client"

import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PublicSiteLayout from "@/components/PublicSiteLayout"

const staffMembers = [
    {
        name: "Chief John Doe",
        rank: "Fire Chief",
        image: "/staffing/chief.svg",
        bio: "Leads the department with an emphasis on readiness, safety, and community trust."
    },
    {
        name: "Captain Jane Smith",
        rank: "Operations Captain",
        image: "/staffing/captain.svg",
        bio: "Coordinates response readiness and oversees day-to-day operational planning."
    },
    {
        name: "Lieutenant Bob Johnson",
        rank: "Training Lieutenant",
        image: "/staffing/lieutenant.svg",
        bio: "Guides training standards and helps prepare members for service in the field."
    }
]

const certificationOptions = [
    "CPR/BLS",
    "Firefighter 1",
    "Firefighter 2",
    "Fire Officer I/II/III",
    "Fire Instructor",
    "Hazmat Awareness",
    "Hazmat Operations",
    "EMR",
    "EMT",
    "AEMT",
    "Paramedic",
    "IS-100",
    "IS-200",
    "IS-700",
    "IS-800"
]

export default function Staffing() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<Record<string, unknown>>({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            bestHours: "",
            teamType: "",
            positionType: "",
            certifications: [] as string[],
            otherCertifications: "",
            message: "",
        },
    })
    const [submitted, setSubmitted] = useState(false)
    const selectedTeam = watch("teamType")

    const onSubmit = async (data: Record<string, unknown>) => {
        const res = await fetch("/api/hiring", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                certifications: Array.isArray(data.certifications) ? data.certifications : [],
            }),
        })

        if (res.ok) {
            setSubmitted(true)
            reset()
        }
    }

    return (
        <PublicSiteLayout
            title="Staffing"
            description="Meet the current ranking officials who help guide the department and support the mission of service to the community."
        >
            <div className="space-y-10">
                <section>
                    <h2 className="mb-4 text-3xl font-bold text-red-600">Current Staff Members</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {staffMembers.map(member => (
                            <div key={member.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="bg-red-50 p-4">
                                    <Image src={member.image} alt={member.name} width={480} height={640} className="h-72 w-full rounded-xl object-cover" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                    <p className="mt-1 font-medium text-red-600">{member.rank}</p>
                                    <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="text-3xl font-bold text-red-600">Apply to the Department</h2>
                    <p className="mt-3 max-w-3xl text-gray-700">
                        Interested in serving with LTVFD? This form is the first step in our hiring process. Please complete the intake form below and a member of our team will follow up with you.
                    </p>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                            <h3 className="text-xl font-semibold text-gray-900">Hiring Process</h3>
                            <div className="mt-4 space-y-4 text-sm text-gray-700">
                                <p><span className="font-semibold text-red-600">Initial Contact:</span> Persons applying reach out through the contact form below to begin the hiring process. We do our best to answer all applications in a timely manner, and they are answered in the order received.</p>
                                <p><span className="font-semibold text-red-600">Primary Phone Call/Email Response:</span> Once your form has been reviewed, a member of the appropriate department team will reach out if you are selected to continue the process and schedule an in-person interview.</p>
                                <p><span className="font-semibold text-red-600">Interview Process:</span> Applicants attend an interview with LTVFD&apos;s hiring committee, provide a completed application and resume before the interview day, and may be asked to attend several interviews before a final decision.</p>
                                <p><span className="font-semibold text-red-600">Secondary Phone Call/Email:</span> After a decision has been made, you will receive a phone call or email regarding next steps. A full background check and drug screening may be required at any time.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Hiring Interest Form</h3>
                            {submitted ? (
                                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                                    Thank you for your interest. Your submission has been sent to our admin inbox.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Full Name</label>
                                        <input {...register("name", { required: true })} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">Name is required</p>}
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-semibold text-gray-700">Phone Number</label>
                                            <input {...register("phone", { required: true })} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" />
                                            {errors.phone && <p className="mt-1 text-sm text-red-500">Phone number is required</p>}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
                                            <input {...register("email", { required: true })} type="email" className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" />
                                            {errors.email && <p className="mt-1 text-sm text-red-500">Email is required</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Best Hours to Reach You</label>
                                        <input {...register("bestHours", { required: true })} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" />
                                        {errors.bestHours && <p className="mt-1 text-sm text-red-500">Best hours are required</p>}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Team Type Applying For</label>
                                        <select {...register("teamType", { required: true })} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none">
                                            <option value="">Select an option</option>
                                            <option value="Auxiliary Team">Auxiliary Team</option>
                                            <option value="Primary Team">Primary Team</option>
                                        </select>
                                        {errors.teamType && <p className="mt-1 text-sm text-red-500">Team type is required</p>}
                                    </div>

                                    {selectedTeam === "Primary Team" && (
                                        <div>
                                            <label className="mb-1 block text-sm font-semibold text-gray-700">Position of Interest</label>
                                            <div className="space-y-2 rounded-lg border border-gray-200 p-3">
                                                {[
                                                    "Firefighter",
                                                    "EMT",
                                                    "Firefighter/EMT",
                                                    "Not sure - I would like more information"
                                                ].map(option => (
                                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <input type="radio" value={option} {...register("positionType", { required: true })} />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.positionType && <p className="mt-1 text-sm text-red-500">Please choose an option</p>}
                                        </div>
                                    )}

                                    {selectedTeam === "Auxiliary Team" && (
                                        <div>
                                            <label className="mb-1 block text-sm font-semibold text-gray-700">Position of Interest</label>
                                            <div className="space-y-2 rounded-lg border border-gray-200 p-3">
                                                {[
                                                    "Auxiliary Team",
                                                    "Not sure - I would like more information"
                                                ].map(option => (
                                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <input type="radio" value={option} {...register("positionType", { required: true })} />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.positionType && <p className="mt-1 text-sm text-red-500">Please choose an option</p>}
                                        </div>
                                    )}

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Certifications</label>
                                        <div className="grid gap-2 rounded-lg border border-gray-200 p-3 sm:grid-cols-2">
                                            {certificationOptions.map(option => (
                                                <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <input type="checkbox" value={option} {...register("certifications")} />
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Other Certifications</label>
                                        <textarea {...register("otherCertifications")} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" rows={3}></textarea>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Additional Notes</label>
                                        <textarea {...register("message")} className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none" rows={4}></textarea>
                                    </div>
                                    <p className="text-sm text-gray-600">This form is the first step in the hiring process.</p>
                                    <button type="submit" className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700">Submit Interest</button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </PublicSiteLayout>
    )
}