export interface AppConfig {
  appName: string;
  appDescription: string;
  title: string;
  welcomeText: string;
  inputPlaceholder: string;
  footerText: string;
}

export const appConfig: AppConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION!,
  title: process.env.NEXT_PUBLIC_TITLE!,
  welcomeText: process.env.NEXT_PUBLIC_WELCOME_TEXT!,
  inputPlaceholder: process.env.NEXT_PUBLIC_INPUT_PLACEHOLDER!,
  footerText: process.env.NEXT_PUBLIC_FOOTER_TEXT!,
};