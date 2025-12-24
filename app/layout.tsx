// app/layout.tsx
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
    <html lang="en" className="h-screen">
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --font-body: 'Funnel Sans', sans-serif;
              --font-display: 'Funnel Display', sans-serif;
              
              --primary-color: ${themeConfig.primaryColor};
              --bg-color: ${themeConfig.bg};
              --surface-color: ${themeConfig.surface};
              --text-primary: ${themeConfig.textPrimary};
              --text-secondary: ${themeConfig.textSecondary};
              --text-placeholder: ${themeConfig.textPlaceholder};
              --border-color: ${themeConfig.border};
              --thinking-color: ${themeConfig.thinkingText};
              --user-bubble: ${themeConfig.userBubble};
              --bot-bubble: ${themeConfig.botBubble};
            }
          `,
          }}
        />
      </head>
      <body
        className="h-screen flex flex-col overflow-hidden antialiased font-body"
        style={{
          backgroundColor: themeConfig.bg,
          color: themeConfig.textPrimary,
        }}
      >
        {/* Fixed header - consistent height across devices */}
        <header
          className="h-14 sm:h-16 shrink-0 backdrop-blur-sm"
          style={{
            backgroundColor: `${themeConfig.bg}f2`,
          }}
        >
          <div className="h-full mx-auto max-w-7xl flex items-center px-4 sm:px-6 md:px-8 gap-2">
            <span
              className="font-display font-semibold text-lg sm:text-xl tracking-tight truncate"
              style={{ color: themeConfig.textPrimary }}
            >
              {appConfig.appName}
            </span>
          </div>
        </header>

        {/* Main area */}
        <main
          className="flex-1 flex justify-center overflow-hidden"
          style={{ backgroundColor: themeConfig.bg }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
