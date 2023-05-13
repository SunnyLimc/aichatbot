/* eslint-disable @next/next/no-page-custom-font */
import { getBuildConfig } from "./config/build";
import "./styles/globals.scss";
import "./styles/highlight.scss";
import "./styles/markdown.scss";

const buildConfig = getBuildConfig();

export const metadata = {
  title: "AI ChatBot",
  description: "Your personal AI Chat Bot.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "AI ChatBot",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="version" content={buildConfig.commitId} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="preconnect" href="https://fonts.proxy.ustclug.org"></link>
        <link
          rel="stylesheet"
          href="https://fonts.proxy.ustclug.org/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap"
        ></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
