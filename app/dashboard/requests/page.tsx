"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

interface Request {
    id: string
    type: string
    description: string
    status: string
    createdAt: string
}

export default function Requests() {
    const { data: session } = useSession()
    const [requests, setRequests] = useState<Request[]>([])
    const { register, handleSubmit, reset } = useForm()

    const fetchRequests = async () => {
        const res = await fetch('/api/requests')
        const data = await res.json()
        setRequests(data)
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const onSubmit = async (data: Record<string, unknown>) => {
        await fetch('/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        reset()
        fetchRequests()
    }

    if (!session) return <div>Please log in</div>

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl mb-6">My Requests</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl mb-4">Submit New Request</h2>
                <div className="mb-4">
                    <label className="block">Type</label>
                    <select {...register("type")} className="w-full p-2 border">
                        <option value="time off">Time Off</option>
                        <option value="request">General Request</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block">Description</label>
                    <textarea {...register("description", { required: true })} className="w-full p-2 border" rows={4}></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
            </form>
            <div className="space-y-4">
                {requests.map(request => (
                    <div key={request.id} className="bg-white p-4 rounded shadow">
                        <p>Type: {request.type}</p>
                        <p>Description: {request.description}</p>
                        <p>Status: {request.status}</p>
                        <p>Created: {new Date(request.createdAt).toDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}