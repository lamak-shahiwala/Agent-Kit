// packages/shared/config/app.ts

export interface AppConfig {
  appName: string;
  appDescription: string;
  title: string;
  welcomeText: string;
  inputPlaceholder: string;
  footerText: string;
}

export const appConfig: AppConfig = {
  appName: "AgentKit",
  appDescription: "AI Assistant",
  title: "Agent Kit",
  welcomeText: "How can I help you today?",
  inputPlaceholder: "Message Agent...",
  footerText: "AI can make mistakes. Please check important info.",
};
