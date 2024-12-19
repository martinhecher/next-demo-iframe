"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function WebsiteLoader() {
  const [website, setWebsite] = useState("")
  const [script, setScript] = useState("")
  const [logs, setLogs] = useState<string[]>([])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const loadWebsite = () => {
    if (iframeRef.current) {
      iframeRef.current.src = website
      addLog(`Loading website: ${website}`)
    }
  }

  const injectScript = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const scriptElement = document.createElement("script")
      scriptElement.src = script
      scriptElement.onload = () => addLog(`Script injected: ${script}`)
      iframeRef.current.contentWindow.document.body.appendChild(scriptElement)
    }
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe) {
      const handleLoad = () => {
        addLog("Iframe load event triggered")
        addLog("Website loaded")
        if (script) {
          injectScript()
        }
      }
      iframe.addEventListener("load", handleLoad)
      return () => iframe.removeEventListener("load", handleLoad)
    }
  }, [script])

  return (
    <div className="flex h-screen">
      <div className="w-[30%] p-4 border-r">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Website URL to load
              </label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="script" className="text-sm font-medium">
                Inject Script URL
              </label>
              <Input
                id="script"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="https://example.com/script.js"
              />
            </div>
            <Button onClick={loadWebsite} className="w-full">
              Load
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-24rem)] w-full rounded-md border border-slate-200 p-4 dark:border-slate-800">
              {logs.map((log, index) => (
                <div key={index} className="mb-2 text-sm">
                  {log}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="w-[70%] p-4">
        <iframe
          ref={iframeRef}
          className="w-full h-full border border-slate-200 rounded-lg dark:border-slate-800"
          title="Loaded Website"
        />
      </div>
    </div>
  )
}

