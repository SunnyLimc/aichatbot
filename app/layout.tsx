/* eslint-disable @next/next/no-page-custom-font */
import { getBuildConfig } from "./config/build";
import "./styles/globals.scss";
import "./styles/highlight.scss";
import "./styles/markdown.scss";

const buildConfig = getBuildConfig();

const TITLE_ALIAS = process.env.TITLE_ALIAS
  ? " (" + process.env.TITLE_ALIAS + ")"
  : "";

export const metadata = {
  title: "AI ChatBot" + TITLE_ALIAS,
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
    title: "AI ChatBot" + TITLE_ALIAS,
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
        <link rel="manifest" href="./site.webmanifest"></link>
        <script src="./serviceWorkerRegister.js" defer></script>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
