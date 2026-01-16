"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useAuth } from "@/context/AuthContext"

const LandingPage = dynamic(() => import("@/components/landing-page"), { ssr: true })
const DashboardPage = dynamic(() => import("@/components/dashboard-page"), { ssr: true })
const ClientViewPage = dynamic(() => import("@/components/client-view-page"), { ssr: true })
const ProjectEditor = dynamic(() => import("@/components/project-editor"), { ssr: true })

export default function Home() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "client" | "project-editor">("landing")
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      setCurrentView("dashboard")
    }
  }, [user, loading])

  return (
    <div className="min-h-screen bg-background">
      {currentView === "landing" && <LandingPage onNavigate={setCurrentView} />}
      {currentView === "dashboard" && <DashboardPage onNavigate={setCurrentView} />}
      {currentView === "client" && <ClientViewPage onNavigate={setCurrentView} />}
      {currentView === "project-editor" && <ProjectEditor onNavigate={setCurrentView} />}
    </div>
  )
}
