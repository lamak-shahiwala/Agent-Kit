import { AgentRequest, AgentResponse } from "@/app/types/api";
import { NextResponse } from "next/server";
import { Message, generateId, generateText } from "ai";

// 1. Force dynamic behavior
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Store messages in-memory
const messages: Message[] = [];

export async function POST(
  req: Request & { json: () => Promise<AgentRequest> },
): Promise<NextResponse<AgentResponse>> {
  try {
    // 2. Extract user message
    const { userMessage } = await req.json();

    // 3. DYNAMICALLY IMPORT the agent creation logic
    // This prevents the "map of undefined" crash during build because 
    // the module is not evaluated until this line runs (which only happens at runtime).
    const { createAgent } = await import("./create-agent");
    const agent = await createAgent();

    // 4. Start streaming/generating response
    messages.push({ id: generateId(), role: "user", content: userMessage });
    
    const { text } = await generateText({
      ...agent,
      messages,
    });

    messages.push({ id: generateId(), role: "assistant", content: text });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : "I'm sorry, I encountered an issue processing your message. Please try again later.",
    });
  }
}
