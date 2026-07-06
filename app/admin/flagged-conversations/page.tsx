"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface FlaggedConversation {
  id: string
  conversationId: string
  messages: string
  flaggedKeywords: string
  reviewed: boolean
  adminNotes: string | null
  createdAt: Date
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [conversations, setConversations] = useState<FlaggedConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login"
    } else if (status === "authenticated") {
      // Check if user is admin
      if (session?.user?.role !== "admin") {
        window.location.href = "/dashboard"
      } else {
        fetchFlaggedConversations()
      }
    }
  }, [status, session])

  async function fetchFlaggedConversations() {
    try {
      const response = await fetch("/api/admin/flagged-conversations")
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      }
    } catch (error) {
      console.error("Error fetching flagged conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Flagged Conversations</h1>
          <Link href="/dashboard" className="text-red-600 hover:text-red-800">
            Back to Dashboard
          </Link>
        </div>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">No flagged conversations yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map(conv => {
              const messages = JSON.parse(conv.messages)
              const keywords = JSON.parse(conv.flaggedKeywords)
              return (
                <div
                  key={conv.id}
                  className="bg-white rounded-lg p-6 shadow cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedId(selectedId === conv.id ? null : conv.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Conversation ID: {conv.conversationId}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(conv.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        conv.reviewed 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {conv.reviewed ? "Reviewed" : "Pending Review"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold text-red-600 mb-2">Flagged Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword: string, idx: number) => (
                        <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedId === conv.id && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-semibold text-gray-900 mb-3">Conversation History:</p>
                      <div className="space-y-3 bg-gray-50 p-3 rounded max-h-96 overflow-y-auto">
                        {messages.map((msg: Record<string, string>, idx: number) => (
                          <div key={idx} className={`p-2 rounded ${
                            msg.role === "user" 
                              ? "bg-blue-100 text-blue-900" 
                              : "bg-green-100 text-green-900"
                          }`}>
                            <p className="font-semibold text-sm">{msg.role.toUpperCase()}:</p>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Admin Notes:
                        </label>
                        <textarea
                          defaultValue={conv.adminNotes || ""}
                          className="w-full p-2 border border-gray-300 rounded"
                          rows={3}
                          placeholder="Add notes about this conversation..."
                        />
                        <button className="mt-2 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                          Save Notes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
