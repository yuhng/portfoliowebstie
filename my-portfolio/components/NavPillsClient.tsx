"use client"

import dynamic from "next/dynamic"

const NavPills = dynamic(() => import("@/components/NavPills"), { ssr: false })

export default function NavPillsClient() {
  return <NavPills />
}
