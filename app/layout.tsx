import type { Metadata } from "next";
import "./globals.css";
import { appConfig } from "@/packages/shared/config/app";
import { themeConfig } from "@/packages/shared/config/theme";

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.appDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400..800&family=Funnel+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-app-bg text-text-main transition-colors duration-200">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --font-body: 'Funnel Sans', sans-serif;
            --font-display: 'Funnel Display', sans-serif;

            --primary-color: ${themeConfig.primaryColor};
            --bg-color: ${themeConfig.bgLight};
            --surface-color: ${themeConfig.surfaceLight};
            --text-primary: ${themeConfig.textPrimaryLight};
            --text-secondary: ${themeConfig.textSecondaryLight};
            --text-placeholder: ${themeConfig.textPlaceholderLight};
            --border-color: ${themeConfig.borderLight};
            --thinking-color: ${themeConfig.thinkingTextLight};
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg-color: ${themeConfig.bgDark};
              --surface-color: ${themeConfig.surfaceDark};
              --text-primary: ${themeConfig.textPrimaryDark};
              --text-secondary: ${themeConfig.textSecondaryDark};
              --text-placeholder: ${themeConfig.textPlaceholderDark};
              --border-color: ${themeConfig.borderDark};
              --thinking-color: ${themeConfig.thinkingTextDark};
            }
          }
        `,
          }}
        />
        <header className="fixed top-0 left-0 w-full flex items-center px-6 py-4 z-50">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-2xl tracking-tight text-text-main">
              {appConfig.appName}
            </span>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
