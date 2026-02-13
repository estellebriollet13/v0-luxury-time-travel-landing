"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

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
      "Bienvenue chez Chronos Voyages. Je suis votre concierge temporel. Comment puis-je vous accompagner dans votre prochain voyage a travers le temps ?",
  },
]

const quickResponses: Record<string, string> = {
  destinations:
    "Nos destinations les plus prisees sont Paris 1889 (l'Exposition Universelle et la Tour Eiffel en construction), le Cretace Superieur (observation de dinosaures en capsule blindee) et Florence 1504 (Renaissance italienne avec Michel-Ange et Botticelli). Souhaitez-vous en savoir plus sur l'une d'elles ?",
  fonctionnement:
    "Nos chrono-capsules vous transportent en toute securite a travers des champs temporels calibres. Chaque voyage inclut une tenue d'epoque sur mesure, un guide historien personnel et nos provisions quantum-stables signatures. L'experience est fluide et parfaitement securisee.",
  tarifs:
    "Nos expeditions temporelles debutent a 198 000 CR pour les forfaits classiques. Les experiences premium, incluant des audiences privees avec des figures historiques et des sejours prolonges, sont disponibles a partir de 350 000 CR. Puis-je organiser une consultation privee ?",
  securite:
    "Chronos Voyages maintient un taux de retour securise de 100% sur plus de 12 000 voyages completes. Nos chrono-ingenieurs surveillent chaque expedition en temps reel et notre Protocole de Prevention des Paradoxes garantit l'integrite de toutes les lignes temporelles.",
  paris:
    "Paris 1889 est une experience inoubliable de 3 a 7 jours. Vous assisterez a la construction de la Tour Eiffel, decouvrirez le Grand Palais, et vous immergerez dans la mode et l'ambiance lumineuse de la Belle Epoque. Les tarifs commencent a 198 000 CR.",
  cretace:
    "L'expedition au Cretace Superieur (-68 millions d'annees) dure 1 a 3 jours. Vous observerez T-Rex et Triceratops depuis notre capsule d'observation blindee, au milieu d'une vegetation prehistorique luxuriante et de volcans actifs. Une experience unique et scientifiquement rigoureuse.",
  florence:
    "Florence 1504 offre un sejour de 5 a 10 jours au coeur de la Renaissance italienne. Visitez l'atelier de Michel-Ange, admirez le Duomo de Brunelleschi et participez a un banquet chez les Medicis. La palette de couleurs ocres et terres de cette epoque est incomparable.",
  default:
    "Merci pour votre interet. Notre equipe de concierges temporels serait ravie de vous assister personnellement. Souhaitez-vous en savoir plus sur nos destinations, le fonctionnement de nos voyages, les tarifs ou nos protocoles de securite ?",
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes("paris") || lower.includes("1889") || lower.includes("eiffel"))
    return quickResponses.paris
  if (
    lower.includes("cretace") ||
    lower.includes("dinosaure") ||
    lower.includes("dino") ||
    lower.includes("t-rex")
  )
    return quickResponses.cretace
  if (
    lower.includes("florence") ||
    lower.includes("renaissance") ||
    lower.includes("michel-ange") ||
    lower.includes("medicis")
  )
    return quickResponses.florence
  if (
    lower.includes("destination") ||
    lower.includes("ou") ||
    lower.includes("voyage") ||
    lower.includes("populaire")
  )
    return quickResponses.destinations
  if (
    lower.includes("comment") ||
    lower.includes("fonctionne") ||
    lower.includes("processus") ||
    lower.includes("marche")
  )
    return quickResponses.fonctionnement
  if (
    lower.includes("prix") ||
    lower.includes("tarif") ||
    lower.includes("cout") ||
    lower.includes("combien")
  )
    return quickResponses.tarifs
  if (
    lower.includes("securite") ||
    lower.includes("risque") ||
    lower.includes("danger") ||
    lower.includes("sur")
  )
    return quickResponses.securite
  return quickResponses.default
}

const suggestedQuestions = [
  "Quelles destinations ?",
  "Comment ca marche ?",
  "Les tarifs",
]

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
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: messageText,
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
    }, 800 + Math.random() * 800)
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-secondary text-foreground hover:bg-secondary/80"
            : "bg-primary text-primary-foreground shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
        }`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed right-6 bottom-24 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-background/50 transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/40 bg-card px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-primary"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Concierge Temporel
            </p>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] tracking-wide text-muted-foreground">
                En ligne - toutes les epoques
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-scroll flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm border border-border/50 bg-card text-card-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-border/50 bg-card px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested questions after initial message */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-border/50 bg-card px-3 py-1.5 text-[11px] text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-border/40 bg-card/50 p-4">
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
              placeholder="Posez votre question..."
              className="flex-1 rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Envoyer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
