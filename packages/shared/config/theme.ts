// packages/shared/config/theme.ts
export interface ThemeConfig {
  appLogo: string;
  primaryColor: string;
  bg: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textPlaceholder: string;
  border: string;
  thinkingText: string;
  userBubble: string;
  botBubble: string;
}

export const themeConfig: ThemeConfig = {
  appLogo: "",
  
  primaryColor: "#000000", // Black send button
  
  bg: "#f9fafb", // Light gray background (gray-50)
  surface: "#ffffff", // Pure white textarea
  
  textPrimary: "#111827", // Dark text
  textSecondary: "#6b7280", // Gray text
  textPlaceholder: "#9ca3af", // Placeholder gray
  
  border: "#e5e7eb", // Light border
  thinkingText: "#9ca3af", // Thinking dots color
  
  userBubble: "#dcfce7", // Light green user bubble
  botBubble: "#f9fafb", // Light gray bot bubble
};