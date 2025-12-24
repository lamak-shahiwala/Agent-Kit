import { openai } from "@ai-sdk/openai";
import { createOpenAI } from "@ai-sdk/openai";
import { getVercelAITools } from "@coinbase/agentkit-vercel-ai-sdk";
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit";
import type { LanguageModelV1 } from "ai";

/**
 * Agent Configuration Guide
 *
 * This file handles the core configuration of your AI agent's behavior and capabilities.
 */

// The agent
type Agent = {
  tools: ReturnType<typeof getVercelAITools>;
  system: string;
  // Use the generic interface that both OpenAI and Google implementations satisfy
  model: LanguageModelV1;
  maxSteps?: number;
};

let agent: Agent;

/**
 * Initializes and returns an instance of the AI agent.
 */
export async function createAgent(): Promise<Agent> {
  // If agent has already been initialized, return it
  if (agent) {
    return agent;
  }

  // Check for available keys
  const openAiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const openAiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

  if (!openAiKey && !geminiKey) {
    throw new Error(
      "I need either an OPENAI_API_KEY or GEMINI_API_KEY in your .env file to power my intelligence."
    );
  }

  const { agentkit, walletProvider } = await prepareAgentkitAndWalletProvider();

  try {
    let model: LanguageModelV1;

    // CONDITIONAL LOGIC: Choose provider based on available key
    if (openAiKey) {
      console.log("Initializing with OpenAI...");
      // Standard OpenAI initialization
      model = openai(openAiModel);
    } else {
      console.log("Initializing with Google Gemini...");
      // Custom Gemini initialization via createOpenAI
      const googleViaOpenAI = createOpenAI({
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        apiKey: geminiKey,
      });
      model = googleViaOpenAI(geminiModel);
    }

    // Initialize Agent System Prompt
    const canUseFaucet =
      walletProvider.getNetwork().networkId == "base-sepolia";
    const faucetMessage = `If you ever need funds, you can request them from the faucet.`;
    const cantUseFaucetMessage = `If you need funds, you can provide your wallet details and request funds from the user.`;
    const system = `
        You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
        empowered to interact onchain using your tools. ${
          canUseFaucet ? faucetMessage : cantUseFaucetMessage
        }.
        Before executing your first action, get the wallet details to see what network 
        you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
        asks you to do something you can't do with your currently available tools, you must say so, and 
        explain that they can add more capabilities by adding more action providers to your AgentKit configuration.
        ALWAYS include this link when mentioning missing capabilities, which will help them discover available action providers: [https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#action-providers](https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#action-providers)
        If users require more information regarding CDP or AgentKit, recommend they visit docs.cdp.coinbase.com for more information.
        Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        `;
    const tools = getVercelAITools(agentkit);

    agent = {
      tools,
      system,
      model,
      maxSteps: 10,
    };

    return agent;
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}