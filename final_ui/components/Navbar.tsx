"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Bell, Compass, Home } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeRoute, setActiveRoute] = useState("")

  useEffect(() => {
    setActiveRoute(pathname)
  }, [pathname])

  const navItems = [
    { name: "Home", icon: Home, route: "/feed" },
    { name: "Discover", icon: Compass, route: "/discover" },
    { name: "Notifications", icon: Bell, route: "/notifications" },
    { name: "Messages", icon: MessageCircle, route: "/messages" },
  ]

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <Link href="/feed">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Creyator%20Logo%20(1)-vHiyCydlbRffFfFrFupbpNRdwyC4ND.png"
                alt="Creyator Logo"
                className="h-12 w-16"
                height={48}
                width={64}
              />
            </Link>
            <Input type="search" placeholder="Search..." className="max-w-sm mx-4" />
          </div>
          <div className="hidden lg:flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.route}
                variant="ghost"
                className={`text-base py-2 px-4 ${activeRoute === item.route ? "bg-[#cdd2b7] text-black rounded-xl" : ""}`}
                onClick={() => router.push(item.route)}
              >
                <item.icon className="h-5 w-5" />
                <span className={activeRoute === item.route ? "ml-2" : "sr-only"}>{item.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

