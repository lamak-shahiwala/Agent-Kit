// packages/shared/config/theme.ts

export interface ThemeConfig {
  appLogo: string;
  primaryColor: string;
  bgLight: string;
  bgDark: string;
  surfaceLight: string;
  surfaceDark: string;
  textPrimaryLight: string;
  textPrimaryDark: string;
  textSecondaryLight: string;
  textSecondaryDark: string;
  textPlaceholderLight: string;
  textPlaceholderDark: string;
  borderLight: string;
  borderDark: string;
  thinkingTextLight: string;
  thinkingTextDark: string;
  inputShadowLight: string;
  inputShadowDark: string;
  // New Bubble Colors
  userBubbleLight: string;
  userBubbleDark: string;
  botBubbleLight: string;
  botBubbleDark: string;
}

export const themeConfig: ThemeConfig = {
  appLogo: "", 

  primaryColor: "#10a37f",

  bgLight: "#ffffff",
  bgDark: "#212121",

  surfaceLight: "#f4f4f4",
  surfaceDark: "#2f2f2f",

  textPrimaryLight: "#374151",
  textPrimaryDark: "#ececec",

  textSecondaryLight: "#6b7280",
  textSecondaryDark: "#b4b4b4",

  textPlaceholderLight: "#9ca3af",
  textPlaceholderDark: "#6b7280",

  borderLight: "#e5e5e5",
  borderDark: "#383838",

  thinkingTextLight: "#6b7280",
  thinkingTextDark: "#b4b4b4",

  inputShadowLight: "shadow-sm",
  inputShadowDark: "shadow-none",

  userBubbleLight: "#e0f2fe", 
  userBubbleDark: "#0c4a6e",  
  
  botBubbleLight: "#f3f4f6",  
  botBubbleDark: "#374151",
};
