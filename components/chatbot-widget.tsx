"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Clock } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Welcome to Chronos Voyages. I am your temporal concierge. How may I assist you with your journey through time?",
  },
]

const quickResponses: Record<string, string> = {
  "popular destinations":
    "Our most sought-after destinations include Imperial Rome (27 BC), Renaissance Florence (1503 AD), and Neo-Tokyo (2150 AD). Each offers a uniquely curated luxury experience. Shall I share more details about any of these?",
  "how does it work":
    "Our chrono-chambers transport you safely through calibrated temporal fields. Each journey includes bespoke era-appropriate attire, a personal historian guide, and our signature quantum-stable provisions. The experience is seamless and entirely safe.",
  pricing:
    "Our temporal expeditions begin at 198,000 CR for standard packages. Premium experiences, which include private audiences with historical figures and extended stays, are available from 350,000 CR. I can arrange a private consultation with our travel architects.",
  safety:
    "Chronos Voyages maintains a perfect 100% safe return rate across 4,200+ completed journeys. Our chrono-engineers monitor every expedition in real-time, and our proprietary Paradox Prevention Protocol ensures the integrity of all timelines.",
  default:
    "Thank you for your interest. Our temporal concierge team would be delighted to assist you personally. Would you like to know about our destinations, how the experience works, pricing, or our safety protocols?",
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes("destination") || lower.includes("where") || lower.includes("popular"))
    return quickResponses["popular destinations"]
  if (lower.includes("how") || lower.includes("work") || lower.includes("process"))
    return quickResponses["how does it work"]
  if (lower.includes("price") || lower.includes("cost") || lower.includes("much"))
    return quickResponses["pricing"]
  if (lower.includes("safe") || lower.includes("risk") || lower.includes("danger"))
    return quickResponses["safety"]
  return quickResponses["default"]
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(userMessage.content)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: response },
      ])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center border border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col border border-border bg-background shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center border border-primary">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Temporal Concierge
              </p>
              <p className="text-xs text-muted-foreground">
                Always available, across all timelines
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-card-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="border border-border bg-card px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.2s" }} />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our journeys..."
                className="flex-1 border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 items-center justify-center border border-primary bg-primary text-primary-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
