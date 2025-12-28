"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

// Hardcoded Dummy Data
const firms = [
  { name: "Alpha Corp", sub: "24 vendors", score: "92%", initial: "AC" },
  { name: "Nimbus Ltd", sub: "18 vendors", score: "88%", initial: "NL" },
  { name: "Orion Group", sub: "31 vendors", score: "85%", initial: "OG" },
  { name: "Vertex Inc", sub: "12 vendors", score: "81%", initial: "VI" },
]

const vendors = [
  { name: "Vendor Alpha", sub: "Alpha Corp", score: "Health: 82", initial: "VA" },
  { name: "Vendor Beta", sub: "Nimbus Ltd", score: "Health: 75", initial: "VB" },
  { name: "Vendor Gamma", sub: "Orion Group", score: "Health: 88", initial: "VG" },
  { name: "Vendor Delta", sub: "Vertex Inc", score: "Health: 68", initial: "VD" },
]

export function TopPerformers() {
  const [view, setView] = React.useState("firms") // Default to firms

  const data = view === "firms" ? firms : vendors
  const title = view === "firms" ? "Top Firms" : "Top Vendors"

  return (
    <Card className="h-full shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </CardTitle>
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[120px] h-8 text-xs font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="firms">Firms</SelectItem>
            <SelectItem value="vendors">Vendors</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
                <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">{item.initial}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            </div>
            <div className="font-semibold text-sm text-slate-900 dark:text-slate-50">
              {item.score}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}