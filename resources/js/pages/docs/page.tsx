"use client"

import { useState, useEffect } from "react" 
import { Search, Menu, X, Moon, Sun, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils" 
import { useIsMobile } from "@/hooks/use-mobile"
import AppLogoIcon from "@/components/app-logo-icon"

export default function DocumentationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false) 
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const navigation = [
    {
      title: "Getting Started",
      links: [
        { title: "Introduction", href: "#introduction" },
        { title: "Installation", href: "#installation" },
        { title: "Quick Start", href: "#quick-start" },
      ],
    },
    {
      title: "Core Concepts",
      links: [
        { title: "Architecture", href: "#architecture" },
        { title: "Components", href: "#components" },
        { title: "Routing", href: "#routing" },
        { title: "State Management", href: "#state-management" },
      ],
    },
    {
      title: "Advanced Guides",
      links: [
        { title: "Performance", href: "#performance" },
        { title: "Security", href: "#security" },
        { title: "Testing", href: "#testing" },
        { title: "Deployment", href: "#deployment" },
      ],
    },
    {
      title: "API Reference",
      links: [
        { title: "Hooks", href: "#hooks" },
        { title: "Utilities", href: "#utilities" },
        { title: "CLI", href: "#cli" },
      ],
    },
  ]

    return ( 
      <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <a href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md  flex items-center justify-center">
                 <AppLogoIcon className="size-8 fill-current text-black dark:text-white" />
                </div>
                <span className="font-semibold hidden md:inline-block">Docs</span>
              </a>
            </div>
            <div className="flex-1 px-2 md:px-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                />
              </div>
            </div> 
          </div>
        </header>

        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-30 w-full flex-col border-r bg-background md:sticky md:flex top-16 h-[calc(100vh-4rem)]",
              sidebarOpen ? "flex" : "hidden md:flex",
            )}
          >
            <ScrollArea className="flex-1 py-6 px-4">
              <nav className="grid gap-4 text-sm">
                {navigation.map((section, i) => (
                  <div key={i} className="pb-4">
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
                    <div className="grid grid-flow-row auto-rows-max">
                      {section.links.map((link, j) => (
                        <a
                          key={j}
                          href={link.href}
                          className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
                        >
                          <span>{link.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </aside>

          {/* Main Content */}
          <main className="relative py-6 px-4 md:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground">
                  Home
                </a>
                <ChevronRight className="h-4 w-4" />
                <a href="#" className="hover:text-foreground">
                  Documentation
                </a>
                <ChevronRight className="h-4 w-4" />
                <span>Introduction</span>
              </div>

              <div className="space-y-8">
                <div>
                  <h1 className="scroll-m-20 text-4xl font-bold tracking-tight" id="introduction">
                    Introduction
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Welcome to our documentation. This guide will help you get started with our platform and explore its
                    features.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight" id="installation">
                    Installation
                  </h2>
                  <p className="leading-7">
                    Getting started is easy. You can install our package using npm, yarn, or pnpm.
                  </p>
                  <div className="relative">
                    <pre className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        npm install @acme/documentation
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight" id="quick-start">
                    Quick Start
                  </h2>
                  <p className="leading-7">Let's create a simple example to get you started with our library.</p>
                  <div className="relative">
                    <pre className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {`import { createApp } from '@acme/documentation'

const app = createApp({
  theme: 'light',
  features: ['analytics', 'authentication']
})

app.start()`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight" id="architecture">
                    Architecture
                  </h2>
                  <p className="leading-7">
                    Our platform is built with a modular architecture that allows for easy customization and extension.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Core</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        The foundation of our platform, providing essential functionality.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Plugins</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Extend functionality with our plugin system for custom features.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Themes</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Customize the look and feel with our theming system.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">API</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Interact with our platform programmatically using our API.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between border-t pt-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </footer>
            </div>
        </ThemeProvider>
  )
}

