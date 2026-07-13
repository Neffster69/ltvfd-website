import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
    const data = await req.json()
    const { name, email, phone, teamType, positionType, bestHours, certifications, otherCertifications, message } = data as Record<string, unknown>

    if (!name || !email || !phone || !teamType || !positionType || !bestHours) {
        return NextResponse.json({ error: "Please complete the required fields" }, { status: 400 })
    }

    const certList = Array.isArray(certifications) ? certifications.join(", ") : ""
    const otherCerts = typeof otherCertifications === "string" ? otherCertifications : ""
    const notes = typeof message === "string" ? message : ""

    await sendEmail({
        subject: `New hiring interest form submission from ${name}`,
        html: `
            <h2>New Hiring Interest Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Best Hours to Reach:</strong> ${bestHours}</p>
            <p><strong>Team Type:</strong> ${teamType}</p>
            <p><strong>Position Type:</strong> ${positionType}</p>
            <p><strong>Certifications:</strong> ${certList}</p>
            <p><strong>Other Certifications:</strong> ${otherCerts}</p>
            <p><strong>Additional Notes:</strong> ${notes}</p>
        `,
        text: `New Hiring Interest Submission\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBest Hours: ${bestHours}\nTeam Type: ${teamType}\nPosition Type: ${positionType}\nCertifications: ${certList}\nOther Certifications: ${otherCerts}\nAdditional Notes: ${notes}`,
    })

    return NextResponse.json({ success: true })
}
