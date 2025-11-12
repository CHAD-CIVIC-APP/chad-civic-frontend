import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import { ThemeProvider } from "next-themes";
import { NoTranslateMeta } from "@/components/NoTranslateMeta";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Chadian Voice',
  description: 'Official government portal for Chad',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning translate="no">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans notranslate`}>
        <NoTranslateMeta />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>   
      </body>
    </html>
  )
}
