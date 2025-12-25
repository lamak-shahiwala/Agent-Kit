import { NextResponse } from "next/server";
import { createAgent } from "./create-agent";
import { generateId, generateText, Message } from "ai";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: "get" });
}

export async function POST(req: Request) {
  try {
    const { userMessage } = await req.json();

    const agent = await createAgent();

    const messages: Message[] = [
      {
        id: generateId(),
        role: "user",
        content: userMessage,
      },
    ];

    const { text } = await generateText({
      ...agent,
      messages,
    });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
