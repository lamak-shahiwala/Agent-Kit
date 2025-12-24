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

  useEffect(() => {
    if (messages.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
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
    <div
      className="h-full w-full flex justify-center"
      style={{ backgroundColor: themeConfig.bg }}
    >
      {/* Responsive container - consistent max-widths */}
      <div className="h-full w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8">
        {messages.length > 0 ? (
          <>
            {/* Messages - scrollable area only */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4">
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                {messages.map((msg, i) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={i}
                      className={`flex w-full ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Consistent bubble design with rounded-2xl */}
                      <div
                        className="max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] leading-6 sm:leading-7 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 shadow-sm"
                        style={{
                          backgroundColor: isUser
                            ? themeConfig.userBubble
                            : themeConfig.botBubble,
                          color: themeConfig.textPrimary,
                        }}
                      >
                        {!isUser && (
                          <div
                            className="mb-1 opacity-80 text-[10px] sm:text-xs font-display font-bold uppercase tracking-[0.15em]"
                            style={{ color: themeConfig.textSecondary }}
                          >
                            {appConfig.appName}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap markdown-content text-sm sm:text-base">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isThinking && (
                  <div className="flex w-full justify-start px-1 pb-20 sm:pb-24">
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

                <div ref={endRef} />
              </div>
            </div>

            {/* Input - pinned at bottom with rounded-[2.5rem] corners */}
            <div className="shrink-0 pb-4 sm:pb-5 md:pb-6 pt-2 sm:pt-3">
              <div
                className="rounded-[2.5rem] border flex items-end gap-3 px-4 sm:px-5 py-2.5 sm:py-3 shadow-md"
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
                  className="flex-1 max-h-40 py-2 resize-none bg-transparent outline-none overflow-y-auto min-h-10 text-sm sm:text-base"
                  style={{
                    color: themeConfig.textPrimary,
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isThinking || !input.trim()}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale hover:opacity-90 shrink-0"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                >
                  <FaArrowUp
                    color="white"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  />
                </button>
              </div>
              <p
                className="mt-2 text-[10px] sm:text-xs text-center"
                style={{ color: themeConfig.textSecondary }}
              >
                {appConfig.footerText}
              </p>
            </div>
          </>
        ) : (
          // Empty state - centered welcome + input
          <div className="flex-1 flex flex-col items-center justify-center gap-10 sm:gap-12 py-8">
            <div className="text-center px-4 sm:px-6 max-w-2xl">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tight"
                style={{ color: themeConfig.textPrimary }}
              >
                {appConfig.welcomeText}
              </h1>
            </div>

            {/* Centered input with rounded-[2.5rem] corners */}
            <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl px-4 sm:px-6">
              <div
                className="rounded-[2.5rem] border flex items-end gap-3 px-4 sm:px-5 py-2.5 sm:py-3 shadow-md"
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
                  className="flex-1 max-h-40 py-2 resize-none bg-transparent outline-none overflow-y-auto min-h-10 text-sm sm:text-base"
                  style={{
                    color: themeConfig.textPrimary,
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isThinking || !input.trim()}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale hover:opacity-90 shrink-0"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                >
                  <FaArrowUp
                    color="white"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  />
                </button>
              </div>
              <p
                className="mt-2 text-[10px] sm:text-xs text-center"
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
