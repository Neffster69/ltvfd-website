"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatResponse {
  response: string
  flagged: boolean
  flaggedKeywords: string[]
}

export default function FiremanFredChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [conversationId, setConversationId] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize conversation
  useEffect(() => {
    const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setConversationId(id)

    // Add welcome message
    addMessage({
      id: `msg_${Date.now()}`,
      role: "assistant",
      content: "I'm fireman Fred, I'm dressed in red, that's what I said! Hello! I'm fireman Fred your virtual AI assistant here for you and Lafayette Township Volunteer Fire Department! Is there anything I can help you with today?",
      timestamp: new Date(),
    })
  }, [])

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Inactivity timeout (15 minutes)
  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [isOpen])

  function addMessage(message: Message) {
    setMessages(prev => [...prev, message])
  }

  async function handleSendMessage() {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          conversationId,
        }),
      })

      const data: ChatResponse = await response.json()

      const assistantMessage: Message = {
        id: `msg_${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      addMessage(assistantMessage)

      // Store flagged conversation if needed
      if (data.flagged) {
        await storeFlaggedConversation(data.flaggedKeywords)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: `msg_${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again or contact us directly at (765) 393-0249.",
        timestamp: new Date(),
      }
      addMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  async function storeFlaggedConversation(keywords: string[]) {
    // This will store the conversation for admin review
    console.log("Flagged conversation stored for review:", keywords)
    // TODO: Implement backend storage for flagged conversations
  }

  function endConversation() {
    setMessages([])
    setIsOpen(false)
    const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setConversationId(id)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
          title="Open Fireman Fred Chat"
        >
          <span className="text-2xl">🚒</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-screen md:h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="/images/fireman-fred-cartoon.png"
                alt="Fireman Fred Cartoon"
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
                style={{ background: '#fff' }}
              />
              <div>
                <h3 className="font-bold text-lg">Fireman Fred</h3>
                <p className="text-sm">LTVFD Assistant</p>
              </div>
            </div>
            <button
              onClick={() => endConversation()}
              className="text-2xl hover:scale-110 transition"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === "user"
                    ? "bg-red-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          < div className="border-t p-4 bg-white" >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask Fireman Fred..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <button
              onClick={() => endConversation()}
              className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800 transition"
            >
              End Conversation
            </button>
          </div >
        </div >
      )
      }
    </>
  )
}
