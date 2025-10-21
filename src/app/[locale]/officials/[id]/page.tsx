'use client'

import OfficialDetail from "@/pages/OfficialDetail"
import { use } from "react"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function OfficialDetailPage({ params }: PageProps) {
  const { id } = use(params)
  return <OfficialDetail id={id} />
}
