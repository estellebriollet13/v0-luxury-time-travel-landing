"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string | number
  role: "user" | "assistant" | "system"
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Bienvenue chez Chronos Voyages. Je suis votre concierge temporel. Comment puis-je vous accompagner dans votre voyage ?",
  },
]

const suggestedQuestions = ["Quelles destinations ?", "Comment ca marche ?", "Les tarifs"]

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // --- LA NOUVELLE FONCTION CONNECTÉE À L'API ---
  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isTyping) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: messageText,
    }

    // 1. On affiche le message de l'utilisateur
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // 2. On appelle ton API locale (route.ts)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          // On envoie tout l'historique pour que l'IA ait du contexte
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      if (!response.ok) throw new Error("Erreur API")

      const data = await response.json()
      
      // 3. On extrait la réponse (Format Mistral : data.choices[0].message.content)
      const aiContent = data.choices?.[0]?.message?.content || "Désolé, j'ai un petit souci de connexion temporelle."

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: aiContent },
      ])
    } catch (error) {
      console.error("Erreur Chatbot:", error)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: "Une erreur est survenue lors de la connexion avec nos serveurs temporels." },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Bouton Flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all ${
          isOpen ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {/* Fenêtre de Chat */}
      <div className={`fixed right-6 bottom-24 z-50 flex h-[520px] w-[380px] flex-col rounded-2xl border bg-background shadow-2xl transition-all ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      }`}>
        <div className="border-b p-4 bg-card rounded-t-2xl font-medium">Concierge Temporel</div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-xs text-muted-foreground animate-pulse">L'IA réfléchit...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 bg-background border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="bg-primary text-primary-foreground p-2 rounded-xl disabled:opacity-50">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  )
}