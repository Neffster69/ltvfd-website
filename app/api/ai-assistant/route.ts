import { NextRequest, NextResponse } from "next/server"
import { findMatchingFAQ } from "@/lib/faq"
import { detectFlaggedKeywords } from "@/lib/flagged-keywords"
import { db } from "@/lib/db"
import { flaggedConversations } from "@/lib/schema"

// For now, we'll create a mock AI response function
// Later, replace with actual OpenAI integration

async function getAIResponse(userMessage: string) {
  // First, check if we can answer from FAQ
  const faqMatch = findMatchingFAQ(userMessage)
  
  if (faqMatch) {
    let response = faqMatch.answer
    if (faqMatch.links && faqMatch.links.length > 0) {
      response += "\n\nHere are some relevant links:"
      faqMatch.links.forEach(link => {
        response += `\n- [${link.text}](${link.href})`
      })
    }
    return response
  }
  
  // If not in FAQ, we would call OpenAI here
  // For now, return a default message
  return "I'm not sure about that. Could you please rephrase your question or provide more details? You can also contact us directly at (765) 393-0249 or visit our contact page for more assistance."
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userMessage, conversationHistory = [], conversationId } = body

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Invalid user message" },
        { status: 400 }
      )
    }

    // Get AI response
    const aiResponse = await getAIResponse(userMessage)

    // Check for flagged keywords
    const flaggedKeywords = detectFlaggedKeywords(userMessage) || detectFlaggedKeywords(aiResponse)
    const shouldFlag = flaggedKeywords.length > 0

    // If flagged, store the conversation
    if (shouldFlag && conversationId) {
      try {
        const updatedHistory = [
          ...conversationHistory,
          { role: "user", content: userMessage },
          { role: "assistant", content: aiResponse }
        ]

        await db.insert(flaggedConversations).values({
          id: `flagged_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          conversationId,
          messages: JSON.stringify(updatedHistory),
          flaggedKeywords: JSON.stringify(flaggedKeywords),
          reviewed: false,
        })
      } catch (error) {
        console.error("Error storing flagged conversation:", error)
        // Continue even if storage fails
      }
    }

    return NextResponse.json({
      response: aiResponse,
      flagged: shouldFlag,
      flaggedKeywords: shouldFlag ? flaggedKeywords : [],
    })
  } catch (error) {
    console.error("AI Assistant error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
