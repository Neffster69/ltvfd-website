// Flagged keywords and conversation management utilities

export const FLAGGED_KEYWORDS = [
  // Emergency/Urgent keywords
  "emergency",
  "911",
  "fire",
  "injury",
  "injured",
  "accident",
  "help",
  "danger",
  "dangerous",
  "critical",
  "critical",
  "death",
  "died",
  "dying",
  
  // Potential threats
  "threat",
  "bomb",
  "weapon",
  "gun",
  "knife",
  "violence",
  "attack",
  
  // Sensitive personal info keywords
  "social security",
  "ssn",
  "credit card",
  "password",
  "private",
  "confidential",
  
  // Incident/Complaint keywords
  "complaint",
  "incident",
  "report",
  "police",
  "investigation",
  "suspect",
]

export interface FlaggedConversation {
  id: string
  timestamp: Date
  messages: Array<{
    role: "user" | "assistant"
    content: string
  }>
  flaggedKeywords: string[]
  reviewed: boolean
  adminNotes?: string
}

export function detectFlaggedKeywords(text: string): string[] {
  const lowerText = text.toLowerCase()
  return FLAGGED_KEYWORDS.filter(keyword => lowerText.includes(keyword))
}

export function shouldFlagConversation(text: string): boolean {
  return detectFlaggedKeywords(text).length > 0
}

export function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
