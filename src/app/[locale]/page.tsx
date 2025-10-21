'use client'

// import { Navbar } from "@/components/navbar/navbar"
import { Hero } from "@/components/Hero"
import { AnnouncementTicker } from "@/components/AnnouncementTicker"

export default function HomePage() {
  return (
    <div className="bg-background flex flex-col">
      <AnnouncementTicker />
      <main>
        <Hero />
      </main>
    </div>
  )
}