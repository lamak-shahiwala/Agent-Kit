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
  appLogo: process.env.NEXT_PUBLIC_APP_LOGO!,

  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR!,

  bgLight: process.env.NEXT_PUBLIC_BG_LIGHT!,
  bgDark: process.env.NEXT_PUBLIC_BG_DARK!,

  surfaceLight: process.env.NEXT_PUBLIC_SURFACE_LIGHT!,
  surfaceDark: process.env.NEXT_PUBLIC_SURFACE_DARK!,

  textPrimaryLight: process.env.NEXT_PUBLIC_TEXT_PRIMARY_LIGHT!,
  textPrimaryDark: process.env.NEXT_PUBLIC_TEXT_PRIMARY_DARK!,

  textSecondaryLight: process.env.NEXT_PUBLIC_TEXT_SECONDARY_LIGHT!,
  textSecondaryDark: process.env.NEXT_PUBLIC_TEXT_SECONDARY_DARK!,

  textPlaceholderLight: process.env.NEXT_PUBLIC_TEXT_PLACEHOLDER_LIGHT!,
  textPlaceholderDark: process.env.NEXT_PUBLIC_TEXT_PLACEHOLDER_DARK!,

  borderLight: process.env.NEXT_PUBLIC_BORDER_LIGHT!,
  borderDark: process.env.NEXT_PUBLIC_BORDER_DARK!,

  thinkingTextLight: process.env.NEXT_PUBLIC_THINKING_TEXT_LIGHT!,
  thinkingTextDark: process.env.NEXT_PUBLIC_THINKING_TEXT_DARK!,

  inputShadowLight: process.env.NEXT_PUBLIC_INPUT_SHADOW_LIGHT!,
  inputShadowDark: process.env.NEXT_PUBLIC_INPUT_SHADOW_DARK!,
};