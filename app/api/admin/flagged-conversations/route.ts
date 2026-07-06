import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { flaggedConversations } from "@/lib/schema"
import { desc } from "drizzle-orm"

export async function GET() {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    // Fetch flagged conversations
    const convos = await db
      .select()
      .from(flaggedConversations)
      .orderBy(desc(flaggedConversations.createdAt))

    return NextResponse.json(convos)
  } catch (error) {
    console.error("Error fetching flagged conversations:", error)
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    )
  }
}
