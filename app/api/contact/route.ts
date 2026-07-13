import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { contactRequests } from "@/lib/schema"
import { randomUUID } from "crypto"
import { sendEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    await db.insert(contactRequests).values({ id: randomUUID(), name, email, message })

    await sendEmail({
        subject: `New contact form submission from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
        text: `New Contact Form Submission\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    return NextResponse.json({ success: true })
}