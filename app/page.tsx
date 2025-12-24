"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAgent } from "./hooks/useAgent";
import { appConfig } from "@/packages/shared/config/app";
import { themeConfig } from "@/packages/shared/config/theme";
import { FaArrowUp } from "react-icons/fa6";

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isThinking } = useAgent();

  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messages.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isThinking]);

  // Auto-resize textarea
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 160) + "px";
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
    <div
      className="h-full w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: themeConfig.bg }}
    >
      {/* The 'h-full flex flex-col' here is key. 
        Because the parent layout uses 100dvh and the viewport is set to resize-content,
        this container will shrink when the keyboard appears, keeping the input at the bottom.
      */}
      <div className="h-full w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col px-3 sm:px-6 md:px-8 relative">
        {messages.length > 0 ? (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pt-2 sm:pt-4 pb-2">
              <div className="flex flex-col gap-4 sm:gap-6">
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
                        className="max-w-[92%] sm:max-w-[85%] md:max-w-[75%] leading-relaxed rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm"
                        style={{
                          backgroundColor: isUser
                            ? themeConfig.userBubble
                            : themeConfig.botBubble,
                          color: themeConfig.textPrimary,
                        }}
                      >
                        {!isUser && (
                          <div
                            className="mb-1 opacity-80 text-[10px] sm:text-xs font-display font-bold uppercase tracking-widest"
                            style={{ color: themeConfig.textSecondary }}
                          >
                            {appConfig.appName}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap markdown-content text-[15px] sm:text-base">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isThinking && (
                  <div className="flex w-full justify-start px-2">
                    <div
                      className="flex items-center gap-1.5"
                      style={{ color: themeConfig.thinkingText }}
                    >
                      <div className="animate-bounce w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current" />
                      <div className="animate-bounce w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current [animation-delay:0.2s]" />
                      <div className="animate-bounce w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={endRef} className="h-4" />
              </div>
            </div>

            {/* Input Area - Fixed at the bottom of the flex container */}
            <div className="shrink-0 pb-3 sm:pb-6 pt-2">
              <div
                className="rounded-[2rem] sm:rounded-[2.5rem] border flex items-end gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-3 shadow-md transition-all"
                style={{
                  backgroundColor: themeConfig.surface,
                  borderColor: themeConfig.border,
                }}
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  placeholder={appConfig.inputPlaceholder}
                  disabled={isThinking}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 max-h-[150px] py-2.5 resize-none bg-transparent outline-none overflow-y-auto min-h-[44px] text-base"
                  style={{
                    color: themeConfig.textPrimary,
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isThinking || !input.trim()}
                  className="h-9 w-9 sm:h-10 sm:w-10 mb-1 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale hover:opacity-90 shrink-0"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                >
                  <FaArrowUp color="white" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <p
                className="mt-2 text-[10px] sm:text-xs text-center px-4 hidden sm:block"
                style={{ color: themeConfig.textSecondary }}
              >
                {appConfig.footerText}
              </p>
            </div>
          </>
        ) : (
          /* Empty State - Using flex-1 to keep input centered/bottom responsive */
          <div className="flex-1 flex flex-col items-center justify-center sm:justify-center gap-8 sm:gap-12 pb-4">
            <div className="text-center px-4 max-w-xl">
              <h1
                className="text-3xl sm:text-4xl font-display font-medium tracking-tight mb-2"
                style={{ color: themeConfig.textPrimary }}
              >
                {appConfig.welcomeText}
              </h1>
            </div>

            <div className="w-full max-w-2xl px-2 sm:px-0">
              <div
                className="rounded-[2rem] sm:rounded-[2.5rem] border flex items-end gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-3 shadow-md"
                style={{
                  backgroundColor: themeConfig.surface,
                  borderColor: themeConfig.border,
                }}
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  placeholder={appConfig.inputPlaceholder}
                  disabled={isThinking}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 max-h-[150px] py-2.5 resize-none bg-transparent outline-none overflow-y-auto min-h-[44px] text-base"
                  style={{
                    color: themeConfig.textPrimary,
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isThinking || !input.trim()}
                  className="h-9 w-9 sm:h-10 sm:w-10 mb-1 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale hover:opacity-90 shrink-0"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                >
                  <FaArrowUp color="white" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <p
                className="mt-3 text-[10px] sm:text-xs text-center px-4"
                style={{ color: themeConfig.textSecondary }}
              >
                {appConfig.footerText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
