import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from './providers'
import Footer from '../../components/footer'
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { NoTranslateMeta } from "@/components/NoTranslateMeta";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ['en', 'fr'];

export const metadata: Metadata = {
  title: 'Chadian Voice',
  description: 'Official government portal for Chad',
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning translate="no">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background flex flex-col font-sans notranslate`}>
        <NoTranslateMeta />
        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <Providers>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </Providers>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}