import { NextResponse } from "next/server";
import { createAgent } from "./create-agent";
import { generateId, generateText, Message } from "ai";
import { AgentRequest, AgentResponse } from "@/app/types/api";

export async function POST(
  req: Request
): Promise<NextResponse<AgentResponse>> {
  try {
    // 1. Parse request body
    const { userMessage } = await req.json();

    // 2. Create agent
    const agent = await createAgent();

    // 3. Create messages PER REQUEST
    const messages: Message[] = [
      {
        id: generateId(),
        role: "user",
        content: userMessage,
      },
    ];

    // 4. Generate response
    const { text } = await generateText({
      ...agent,
      messages,
    });

    // 5. Return JSON response
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}