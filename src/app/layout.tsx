import "ayyra/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./_analytics/provider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "ayyra/app/api/uploadthing/core";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TopNav } from "./_components/topnav";
import { Toaster } from "ayyra/components/ui/sonner";

export const metadata: Metadata = {
  title: "t3gallery",
  description: "Generated by afiq",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <PostHogProvider>
        <html lang="en" className={`${geist.variable}`}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body className={`$(inter.variable) dark font-sans`}>
            <div className="grid-rows-[auto, 1fr] grid h-screen">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
