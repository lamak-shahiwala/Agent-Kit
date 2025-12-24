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
}

export const themeConfig: ThemeConfig = {
  appLogo: "", // Path to image if you have one, e.g., "/logo.png"

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
};
