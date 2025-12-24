"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAgent } from "./hooks/useAgent";
import { appConfig } from "@/packages/shared/config/app";
import { themeConfig } from "@/packages/shared/config/theme";

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isThinking } = useAgent();

  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 200) + "px";
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex flex-col h-screen bg-app-bg overflow-hidden">
      <div className="h-12 lg:h-5 shrink-0" />
      <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        {messages.length > 0 ? (
          <div className="max-w-2xl mx-auto flex flex-col gap-6 py-4">
            {messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={i}
                  className={`flex w-full ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] leading-7 ${
                      isUser
                        ? "bg-app-surface rounded-2xl px-5 py-2.5"
                        : "px-0 py-2"
                    } text-text-main`}
                  >
                    {!isUser && (
                      <div className="mb-1 opacity-80 text-xs font-display font-bold uppercase tracking-widest text-text-sec">
                        {appConfig.appName}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap markdown-content">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
            {isThinking && (
              <div className="flex w-full justify-start px-1">
                <div className="flex items-center gap-1.5 text-thinking">
                  <div className="animate-bounce w-1 h-1 rounded-full bg-current" />
                  <div className="animate-bounce w-1 h-1 rounded-full bg-current [animation-delay:0.2s]" />
                  <div className="animate-bounce w-1 h-1 rounded-full bg-current [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={endRef} className="h-4" />
          </div>
        ) : (
          /* Empty State - Centered */
          <div className="flex flex-col items-center justify-center h-full opacity-90 -mt-10">
            <h1 className="text-4xl font-display font-medium tracking-tight text-text-main text-center mb-8">
              {appConfig.welcomeText}
            </h1>
          </div>
        )}
      </div>

      {/* 3. Fixed Input Area */}
      {/* shrink-0 prevents it from squishing. It sits naturally below the scroll area. */}
      <div className="w-full shrink-0 px-4 pb-6 pt-2 bg-app-bg z-20">
        <div className="max-w-2xl mx-auto flex items-end gap-3 p-2.5 rounded-[2.5rem] border bg-app-surface border-app-border">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            placeholder={appConfig.inputPlaceholder}
            disabled={isThinking}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 max-h-50 py-2.5 px-4 resize-none bg-transparent outline-none overflow-y-auto min-h-12 text-text-main placeholder-text-ph"
          />
          <button
            onClick={handleSend}
            disabled={isThinking || !input.trim()}
            className="h-9 w-9 mb-1 rounded-full flex items-center justify-center transition-all disabled:opacity-20 disabled:grayscale"
            style={{ backgroundColor: themeConfig.primaryColor }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
