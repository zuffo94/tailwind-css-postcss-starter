"use client";

import React from "react";

import "./globals.css";

export const metadata = {
  title: "Arguments App",
  description: "App to record and resolve arguments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
      <body className="bg-white text-black min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
