import {
  useState,
  useRef,
  useEffect
} from "react"

import axios from "axios"

import ReactMarkdown from "react-markdown"

function ChatPage() {

  const [query, setQuery] = useState("")

  const [messages, setMessages] = useState(() => {

    const saved = localStorage.getItem(
      "chat_messages"
    )

    return saved
      ? JSON.parse(saved)
      : []
  })

  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {

    localStorage.setItem(
      "chat_messages",
      JSON.stringify(messages)
    )

  }, [messages])

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })

  }, [messages])

  const handleAsk = async () => {

    if (!query.trim()) return

    const userMessage = {
      type: "user",
      text: query
    }

    setMessages((prev) => [
      ...prev,
      userMessage
    ])

    setLoading(true)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat/ask",
        {
          query: query
        }
      )

      const aiMessage = {
        type: "ai",
        text: response.data.answer,
        sources: response.data.sources
      }

      setMessages((prev) => [
        ...prev,
        aiMessage
      ])

    } catch (error) {

      console.log(error)

      alert("Error generating response")
    }

    setLoading(false)

    setQuery("")
  }

  const clearChat = () => {

    setMessages([])

    localStorage.removeItem(
      "chat_messages"
    )
  }

  return (

    <div className="h-screen bg-slate-950 text-white flex flex-col">

      <div className="p-6 border-b border-slate-800 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-blue-400">
            CampusGPT
          </h1>

          <p className="text-slate-400 mt-2">
            Intelligent College RAG Assistant
          </p>

        </div>

        <button
          onClick={clearChat}
          className="bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-xl"
        >
          Clear Chat
        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {
          messages.map((message, index) => (

            <div
              key={index}
              className={`max-w-4xl ${
                message.type === "user"
                  ? "ml-auto"
                  : "mr-auto"
              }`}
            >

              <div
                className={`p-5 rounded-2xl shadow-lg ${
                  message.type === "user"
                    ? "bg-blue-500"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >

                {
                  message.type === "ai"
                  ? (
                      <div className="prose prose-invert max-w-none">

                        <ReactMarkdown>
                          {message.text}
                        </ReactMarkdown>

                      </div>
                    )
                  : (
                      <p className="whitespace-pre-wrap">
                        {message.text}
                      </p>
                    )
                }

              </div>

              {
                message.type === "ai" &&
                message.sources && (

                  <div className="mt-4 bg-slate-900 border border-slate-700 rounded-2xl p-5">

                    <h3 className="text-sm font-semibold text-slate-300 mb-4">
                      Retrieved Sources
                    </h3>

                    <div className="space-y-4">

                      {
                        message.sources.map(
                          (source, idx) => (

                            <div
                              key={idx}
                              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                            >

                              <div className="flex items-center justify-between mb-3">

                                <p className="text-blue-400 text-sm font-semibold">
                                  {source.source}
                                </p>

                                <p className="text-green-400 text-xs">
                                  Score: {source.score.toFixed(3)}
                                </p>

                              </div>

                              <p className="text-slate-300 text-sm leading-relaxed">
                                {source.text.slice(0, 300)}...
                              </p>

                            </div>
                          )
                        )
                      }

                    </div>

                  </div>
                )
              }

            </div>
          ))
        }

        {
          loading && (

            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl max-w-md">

              <div className="flex items-center gap-3">

                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>

                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>

                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>

                <p className="text-slate-300 ml-2">
                  Thinking...
                </p>

              </div>

            </div>
          )
        }

        <div ref={messagesEndRef} />

      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-950">

        <div className="flex gap-4 max-w-5xl mx-auto">

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about uploaded documents..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleAsk}
            className="bg-blue-500 hover:bg-blue-600 transition-all px-8 rounded-2xl font-semibold shadow-lg shadow-blue-500/20"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}

export default ChatPage