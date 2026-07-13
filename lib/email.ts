import nodemailer from "nodemailer"

type EmailPayload = {
    to?: string
    subject: string
    html: string
    text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailPayload) {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.EMAIL_FROM || user || "ltvfd30admin@gmail.com"
    const destination = to || process.env.EMAIL_TO || "ltvfd30admin@gmail.com"

    if (!host || !user || !pass) {
        console.info(`[email] SMTP not configured. Would have sent message to ${destination}`)
        return { ok: true, skipped: true }
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    })

    await transporter.sendMail({
        from,
        to: destination,
        subject,
        html,
        text,
    })

    return { ok: true, skipped: false }
}
