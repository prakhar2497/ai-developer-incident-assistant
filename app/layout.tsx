import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "AI Developer Incident Assistant",
  description: "Developer incident management and analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />

          <div className="flex flex-1 flex-col">
            <Header />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
